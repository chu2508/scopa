import { IsNotEmpty } from "class-validator";

export class ShopDetailQuery {
  @IsNotEmpty()
  id!: string;
}
