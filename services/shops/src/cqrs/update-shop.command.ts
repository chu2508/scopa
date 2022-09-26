import { BusinessDates, Location } from "@core/common";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class UpdateShopCommand {
  id!: string;
  @IsNotEmpty()
  name!: string;
  @IsNotEmptyObject()
  location!: Location;
  @Type(() => BusinessDates)
  businessDates!: BusinessDates;
}
