import { IsOptional, IsNumber, IsString, IsIn } from 'class-validator';

export class SearchProductsDto {
  @IsOptional() @IsNumber() page?: number;
  @IsOptional() @IsNumber() limit?: number;

  @IsOptional() @IsString() sortBy?: string;
  @IsOptional() @IsIn(['ASC', 'DESC']) order?: 'ASC' | 'DESC';

  @IsOptional()
  filters?: {
    id?: number;
    nombre?: string;
    descripcion?: string;
    sku?: string;
  };
}
