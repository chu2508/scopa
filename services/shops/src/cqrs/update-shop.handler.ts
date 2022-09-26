import { NotFoundError } from "@core/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ShopRepoImpl } from "../infra/repo";
import { UpdateShopCommand } from "./update-shop.command";

@CommandHandler(UpdateShopCommand)
export class UpdateShopHandler implements ICommandHandler<UpdateShopCommand> {
  constructor(private _shopRepo: ShopRepoImpl) {}

  async execute(command: UpdateShopCommand): Promise<any> {
    const shop = await this._shopRepo.findBy(command.id);

    if (!shop) {
      throw new NotFoundError(`未找到ID为${command.id}门店`);
    }

    shop.name = command.name;
    shop.location = command.location;
    shop.businessDates = command.businessDates;

    this._shopRepo.save(shop);
  }
}
