import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Shop } from "../domain/shop";
import { ShopRepoImpl } from "../infra/repo";
import { CreateShopCommand } from "./create-shop.commad";

@CommandHandler(CreateShopCommand)
export class CreateShopHandler implements ICommandHandler<CreateShopCommand> {
  constructor(private _shopRepo: ShopRepoImpl) {}

  async execute(command: CreateShopCommand): Promise<any> {
    const shop = new Shop(command.name, command.location, command.businessDates);

    await this._shopRepo.save(shop);
  }
}
