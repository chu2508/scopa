import { CommoditySKU } from "../CommoditySKU";
describe("CommoditySKU tests", () => {
  test("如果使用正确的参数new CommoditySKU，应该返回CommoditySKU实例", () => {
    const sku = new CommoditySKU(0, "test name", 1);

    expect(sku).toBeDefined();
  });

  test("如果创建CommoditySKU的参数不对，应该抛出异常", () => {
    expect(() => new CommoditySKU(-1, "test name")).toThrowError();
    expect(() => new CommoditySKU(0, "1")).toThrowError();
    expect(() => new CommoditySKU(0, Array.from({ length: 21 }, () => 1).join(""))).toThrowError();
    expect(() => new CommoditySKU(0, "test name", -1)).toThrowError();
  });
});
