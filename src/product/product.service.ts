import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { SearchProductsDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}


  async create(dto: CreateProductDto) {
    // Regla: SKU único
    const exists = await this.repo.findOne({ where: { sku: dto.sku } });
    if (exists) throw new ConflictException('El SKU ya existe');

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateProductDto) {
    // Verificar existencia
    const producto = await this.findOne(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no existe`);
    }

    // Regla: stock no negativo
    if (dto.stock !== undefined && dto.stock < 0) {
      throw new BadRequestException('El stock no puede ser negativo');
    }

    // Regla: SKU único (si lo quieren cambiar)
    if (dto.sku) {
      const other = await this.repo.findOne({ where: { sku: dto.sku } });
      if (other && other.id !== id) {
        throw new ConflictException('El SKU ya existe para otro producto');
      }
    }

    const merged = this.repo.merge(producto, dto);
    return this.repo.save(merged);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no existe`);
    }

    // Regla: no eliminar si stock > 0
    if (producto.stock > 0) {
      throw new BadRequestException(
        'No se puede eliminar un producto con stock mayor a cero',
      );
    }

    await this.repo.delete(id);
    return { message: 'Producto eliminado' };
  }

  // ───────────────────────────
  // Búsqueda avanzada con paginación
  // ───────────────────────────
  async search(dto: SearchProductsDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      order = 'ASC',
      filters = {},
    } = dto;

    // Sanitizar page/limit mínimos
    const safePage = page < 1 ? 1 : page;
    const safeLimit = limit < 1 ? 10 : limit;

    const where: any = {
      ...(filters.id !== undefined && { id: filters.id }),
      ...(filters.nombre && { nombre: ILike(`%${filters.nombre}%`) }),
      ...(filters.descripcion && { descripcion: ILike(`%${filters.descripcion}%`) }),
      ...(filters.sku && { sku: filters.sku }),
    };

    const [data, total] = await this.repo.findAndCount({
      where,
      take: safeLimit,
      skip: (safePage - 1) * safeLimit,
      order: { [sortBy]: order },
    });

    return {
      data,
      currentPage: safePage,
      totalPages: Math.ceil(total / safeLimit),
      totalItems: total,
    };
  }
}
