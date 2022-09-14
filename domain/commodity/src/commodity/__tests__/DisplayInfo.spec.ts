import { DisplayInfo } from "../DisplayInfo";

describe("Display Info tests", () => {
  test("使用正确的参数new DisplayInfo，应该返回DisplayInfo实例", () => {
    const info = new DisplayInfo("http://www.a.com/a.jpg", [], "", "");

    expect(info).toBeDefined();
  });

  test("使用无效的参数new DisplayInfo，应该抛出异常", () => {
    expect(() => new DisplayInfo("http:", [], "", "")).toThrowError();
    expect(() => new DisplayInfo("http://www.a.com/a.jpg", ["1"], "", "")).toThrowError();
    expect(() => new DisplayInfo("http://www.a.com/a.jpg", ["2", "3"], "", "")).toThrowError();
  });
});
