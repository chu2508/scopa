import { arrayMinSize, isNotEmpty, maxLength, minLength } from "class-validator";
import { v4 as uuid } from "uuid";
import { CommoditySKU } from "./CommoditySKU";
import { DisplayInfo } from "./DisplayInfo";
import { SaleInfo } from "./SaleInfo";

export { CommoditySKU, DisplayInfo, SaleInfo };

export enum CommodityType {
  SPU = "SPU",
  PACKAGE = "PACKAGE",
}

export type CommodityCreateParams = {
  name: string;
  alias: string;
  categoryId: string;
  displayInfo: DisplayInfo;
  type: CommodityType;
  skuList: CommoditySKU[];
  saleInfo: SaleInfo;
};

export class Commodity {
  private _id: string;
  private _name: string;
  private _alias: string;
  private _categoryId: string;
  private _displayInfo: DisplayInfo;
  private _type: CommodityType;
  private _skuList: CommoditySKU[];
  private _saleInfo: SaleInfo;

  constructor(params: CommodityCreateParams) {
    if (isNotEmpty(params.alias) && (!minLength(params.alias, 2) || !maxLength(params.alias, 8))) {
      throw new Error("别名长度应为2-8个字");
    }
    if (!minLength(params.name, 2) || !maxLength(params.name, 20)) {
      throw new Error("名称长度应为2-20个字");
    }
    if (!arrayMinSize(params.skuList, 1)) {
      throw new Error("需要至少一个SKU");
    }

    this._id = uuid();
    this._name = params.name;
    this._alias = params.alias;
    this._categoryId = params.categoryId;
    this._displayInfo = params.displayInfo;
    this._type = params.type;
    this._skuList = params.skuList;
    this._saleInfo = params.saleInfo;
  }
}
