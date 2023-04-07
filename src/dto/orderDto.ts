import { IsNotEmpty } from 'class-validator';
export class OrderDto {
  @IsNotEmpty()
  items: CoffeIdAndQuantity[];
}
export type CoffeIdAndQuantity = {
  coffe_id: string;
  quantity: number;
};
