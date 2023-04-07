import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  coffe_id: string;
}
