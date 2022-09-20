import { Shop, ShopRepo } from "@domain/shops";
import { CreateShopCommand } from "../commands/CreateShopCommand";

export class CreateShopHandler {
  constructor(private _shopRepo: ShopRepo) {}
  handle(command: CreateShopCommand) {
    const shop = new Shop(command.name, command.location, command.businessDates);

    return this._shopRepo.save(shop);
  }
}
