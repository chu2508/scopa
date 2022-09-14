import { BusinessDates, SalePlatforms } from "@core/common";
import { SaleInfo } from "../SaleInfo";
describe("SaleInfo tests", () => {
  test("使用正确的参数new SaleInfo，应该返回SaleInfo实例", () => {
    const info = new SaleInfo({
      saleDates: BusinessDates.FULL_BUSINESS_DATE,
      salePlatforms: [SalePlatforms.APP, SalePlatforms.POS],
      minSaleNumber: 1,
      addNumber: 1,
      limitNumber: 0,
    });

    expect(info).toBeDefined();
  });

  test("使用无效参数new SaleInfo，应该抛出Error", () => {
    const create = (saleDates: BusinessDates, salePlatforms: SalePlatforms[], minSaleNumber: number, addNumber: number, limitNumber: number) =>
      new SaleInfo({
        saleDates,
        salePlatforms,
        minSaleNumber,
        addNumber,
        limitNumber,
      });

    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [SalePlatforms.APP, SalePlatforms.APP], 1, 1, 0)).toThrowError();
    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [], 0, 1, 0)).toThrowError();
    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [], 1, 1.1, 0)).toThrowError();
    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [], 1, 1, 1.1)).toThrowError();
    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [], 1.1, 1, 0)).toThrowError();
    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [], 1, 0, 0)).toThrowError();
    expect(() => create(BusinessDates.FULL_BUSINESS_DATE, [], 2, 1, 1)).toThrowError();
  });
});
