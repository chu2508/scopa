import { maxLength, min, minLength } from "class-validator";
export class CommoditySKU {
  private _price: number;
  private _name: string;
  private _packageFee: number;

  constructor(price: number, name: string, packageFee: number = 0) {
    if (!min(price, 0)) {
      throw new Error("售价不能小于0");
    }
    if (!minLength(name, 2)) {
      throw new Error("名称不能小于2个字");
    }
    if (!maxLength(name, 20)) {
      throw new Error("名称不能大于20个字");
    }
    if (!min(packageFee, 0)) {
      throw new Error("打包费不能小于0");
    }

    this._name = name;
    this._price = price;
    this._packageFee = packageFee;
  }
}
