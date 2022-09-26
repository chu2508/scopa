import { BusinessDates, Location } from "@core/common";
import { isEmpty, maxLength, minLength, isInstance } from "class-validator";
import { v4 as uuid } from "uuid";

export class Shop {
  private _id: string;
  private _name!: string;
  private _location!: Location;
  private _businessDates!: BusinessDates;

  static fromDB(obj: Record<string, any>) {
    return new Shop(obj.name, obj.location, obj.businessDates, obj.id);
  }

  constructor(name: string, location: Location, businessDates: BusinessDates, id?: string) {
    this._id = id || uuid();
    this.name = name;
    this.location = location;
    this.businessDates = businessDates;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get location() {
    return this._location;
  }

  get businessDates() {
    return this._businessDates;
  }

  set name(value: string) {
    if (!minLength(value, 2) || !maxLength(value, 20)) {
      throw new Error("门店名称长度在2-20个字");
    }
    this._name = value;
  }

  set location(value: Location) {
    if (isEmpty(value)) {
      throw new Error("门店位置不能为空");
    }
    this._location = value;
  }

  set businessDates(value: BusinessDates) {
    if (isEmpty(value)) {
      throw new Error("门店营业时间不能为空");
    }
    if (!(value instanceof BusinessDates)) {
      throw new Error("设置的值不是BusinessDates的实例");
    }
    this._businessDates = value;
  }
}

export interface ShopRepo {
  save(shop: Shop): void;
  findBy(id: string): Promise<Shop | undefined>;
}
