import { BusinessDates, Location } from "@core/common";

export class CreateShopCommand {
  name!: string;
  location!: Location;
  businessDates!: BusinessDates;
}
