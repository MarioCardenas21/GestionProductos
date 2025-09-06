import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Vincula la entidad Product al repositorio
  controllers: [ProductController],               // Expone los endpoints
  providers: [ProductService],                    // Contiene la lógica de negocio
  exports: [ProductService],                      // Permite usar ProductService en otros módulos
})
export class ProductModule {}
