import { BusinessDates } from "@core/common";
import { Shop } from "@domain/shops";

export class ShopDetailDTO {
  static fromDomain(shop: Shop): ShopDetailDTO {
    return new ShopDetailDTO();
  }

  id!: string;
  name!: string;
  location!: Location;
  businessDates!: BusinessDates;
}
