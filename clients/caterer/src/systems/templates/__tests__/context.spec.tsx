import { render } from "@testing-library/react";
import { useContext } from "react";
import { ConfigContext } from "../context";

describe("Render config context", () => {
  test("未初始化配置对象时抛出Error", () => {
    const MockCom = () => {
      const config = useContext(ConfigContext);
      const template = config.template;
      if (template) {
        return null;
      }
      return null;
    };
    expect(() => render(<MockCom />)).toThrowError("RenderConfig未进行初始化赋值");
  });
});
