import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'productos',
      autoLoadEntities: true,
      synchronize: true, // ❗ Solo para desarrollo
    }),
    ProductModule,
  ],
})
export class AppModule {}
