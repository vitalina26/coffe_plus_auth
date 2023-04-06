import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  coffe_id: string;
}
