import { BusinessDates, Location } from "@core/common";
import { isEmpty, maxLength, minLength } from "class-validator";
import { v4 as uuid } from "uuid";

export class Shop {
  private _id: string;
  private _name: string;
  private _location: Location;
  private _businessDates: BusinessDates;
  private _menuId?: string;

  constructor(name: string, location: Location, businessDates: BusinessDates) {
    if (!minLength(name, 2) || !maxLength(name, 20)) {
      throw new Error("门店名称长度在2-20个字");
    }
    if (isEmpty(location)) {
      throw new Error("门店位置不能为空");
    }
    if (isEmpty(businessDates)) {
      throw new Error("门店营业时间不能为空");
    }

    this._id = uuid();
    this._name = name;
    this._location = location;
    this._businessDates = businessDates;
  }

  bindMenu(menuId: string) {
    this._menuId = menuId;
  }
}

export interface ShopRepo {
  save(shop: Shop): void;
  findBy(id: string): Promise<Shop | undefined>;
}
