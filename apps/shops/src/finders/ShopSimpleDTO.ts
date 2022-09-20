import { BusinessDates } from "@core/common";
import { Expose, Transform } from "class-transformer";

export class ShopSimpleDTO {
  id!: string;
  name!: string;
  location!: Location;
  @Expose()
  @Transform(({ value }) => BusinessDates.fromJSON(value))
  businessDates!: BusinessDates;
}
