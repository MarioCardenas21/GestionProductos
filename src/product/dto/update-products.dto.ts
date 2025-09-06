import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';
import { Min, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  @Min(0)
  stock: number;
}
