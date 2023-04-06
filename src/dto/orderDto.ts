import { IsNotEmpty } from 'class-validator';
import { Status } from 'src/entity/order';

export class OrderDto {
  @IsNotEmpty()
  status: Status;
  items: string[];
}
