import { BusinessDates } from "@core/common";
import { Transform } from "class-transformer";

export class ShopSimpleDTO {
  id!: string;
  name!: string;
  location!: Location;
  @Transform(({ value }) => BusinessDates.fromJSON(value))
  businessDates!: BusinessDates;
}
