import { BusinessDates } from "@core/common";
import { CommoditySKU } from "../CommoditySKU";
import { DisplayInfo } from "../DisplayInfo";
import { Commodity, CommodityType } from "../index";
import { SaleInfo } from "../SaleInfo";

describe("Display Info tests", () => {
  const sku = new CommoditySKU("test001", 1, "Normal", 0);
  const displayInfo = new DisplayInfo("http://a.jpg", [], "", "");
  const saleInfo = new SaleInfo({
    saleDates: BusinessDates.FULL_BUSINESS_DATE,
    salePlatforms: [],
    minSaleNumber: 1,
    addNumber: 1,
    limitNumber: 0,
  });
  test("使用正确的参数new Commodity，应该返回Commodity实例", () => {
    const info = new Commodity({
      name: "Test name",
      alias: "Alias",
      type: CommodityType.SPU,
      categoryId: "",
      skuList: [sku],
      displayInfo,
      saleInfo,
    });

    expect(info).toBeDefined();
  });

  test("使用无效的参数new Commodity，应该抛出异常", () => {
    const cerate = (name: string, alias: string, skuList: CommoditySKU[]) =>
      new Commodity({
        name,
        alias,
        type: CommodityType.SPU,
        categoryId: "",
        skuList,
        displayInfo,
        saleInfo,
      });

    expect(() => cerate("", "", [sku])).toThrowError();
    expect(() => cerate(Array.from({ length: 21 }, () => 1).join(""), "", [sku])).toThrowError();
    expect(() => cerate("11", "1", [sku])).toThrowError();
    expect(() => cerate("11", "111111111", [sku])).toThrowError();
    expect(() => cerate("11", "11", [])).toThrowError();
  });
});
