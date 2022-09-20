import { MenuRepo } from "@domain/commodities";
import { ShopRepo } from "@domain/shops";
import { ShopBindMenuCommand } from "../commands/ShopBindMenuCommand";

export class ShopBindMenuHandler {
  constructor(private _menuRepo: MenuRepo, private _shopRepo: ShopRepo) {}

  async handle(command: ShopBindMenuCommand) {
    const [menu, shop] = await Promise.all([this._menuRepo.findBy(command.menuId), this._shopRepo.findBy(command.shopId)]);
    if (!menu) throw new Error("未找到菜单");
    if (!shop) throw new Error("未找到门店");

    shop.bindMenu(menu.id);

    this._shopRepo.save(shop);
  }
}
