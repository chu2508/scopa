import * as taro from "@tarojs/taro";
import { jumpBehavior } from "..";

jest.mock("@tarojs/taro", () => ({ navigateTo: jest.fn() }));

const mockTaro = taro as jest.Mocked<typeof taro>;

describe("jump behavior", () => {
  test("使用正确的参数进行跳转", () => {
    const link = "/pages/test/page";
    jumpBehavior();
    expect(mockTaro.navigateTo).toBeCalledWith({ url: link });
  });
});
