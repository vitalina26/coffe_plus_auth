import { Status } from 'src/entity/order';

export class OrderUpdateDto {
  status?: Status;
  items?: string[];
}
