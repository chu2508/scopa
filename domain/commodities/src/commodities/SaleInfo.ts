import { BusinessDates, SalePlatforms } from "@core/common";
import { arrayUnique, isInt, min } from "class-validator";

export type SaleInfoCreateParams = {
  /** 销售时间段 */
  saleDates: BusinessDates;
  /** 售卖平台 */
  salePlatforms: SalePlatforms[];
  /** 最小购买数量，不可小于1 */
  minSaleNumber: number;
  /** 售卖增量，不可小于1 */
  addNumber: number;
  /** 购买限制数量，0为不限制，如果不为0，则不可小于minSaleNumber */
  limitNumber: number;
};

export class SaleInfo {
  private _saleDates: BusinessDates;
  private _salePlatforms: SalePlatforms[];
  private _minSaleNumber: number;
  private _addNumber: number;
  private _limitNumber: number;

  constructor(params: SaleInfoCreateParams) {
    if (!arrayUnique(params.salePlatforms)) {
      throw new Error("售卖平台不可重复");
    }
    if (!isInt(params.minSaleNumber) || !min(params.minSaleNumber, 1)) {
      throw new Error("最小购买数量必须为整数，且不能小于1");
    }
    if (!isInt(params.addNumber) || !min(params.addNumber, 1)) {
      throw new Error("售卖增量必须为整数，且不能小于1");
    }

    const limitNumber = params.limitNumber;
    if (!isInt(limitNumber)) {
      throw new Error("限制购买数量必须为整数");
    }
    if (limitNumber !== 0 && limitNumber < params.minSaleNumber) {
      throw new Error("限制购买数量必须大于最小购买数量");
    }

    this._saleDates = params.saleDates;
    this._salePlatforms = params.salePlatforms;
    this._minSaleNumber = params.minSaleNumber;
    this._addNumber = params.addNumber;
    this._limitNumber = limitNumber;
  }
}
