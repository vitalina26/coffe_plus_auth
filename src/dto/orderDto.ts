export class OrderDto {
  items: CoffeIdAndQuantity[];
}
export type CoffeIdAndQuantity = {
  coffe_id: string;
  quantity: number;
};
