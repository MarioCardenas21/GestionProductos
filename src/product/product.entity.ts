import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('productos')
@Unique(['sku'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @Column()
  sku: string;
}
