import { BusinessDates, Location } from "@core/common";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateShopCommand {
  @IsNotEmpty()
  name!: string;
  @IsNotEmptyObject()
  location!: Location;

  @Type(() => BusinessDates)
  @IsDefined()
  businessDates!: BusinessDates;
}
