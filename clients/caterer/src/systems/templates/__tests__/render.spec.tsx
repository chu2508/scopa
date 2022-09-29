import { render } from "@testing-library/react";
import { ConfigProvider } from "../context";
import { ComponentType, TemplateData } from "../interface";
import { RenderContainer } from "../render";

describe("RenderContainer", () => {
  test("正确的获取template，并调用componentFactory获取组件", () => {
    const template: TemplateData = {
      id: 1,
      name: "test template",
      components: [
        { name: "1", type: ComponentType.BUTTON, behavior: "jump" },
        { name: "2", type: ComponentType.BUTTON, behavior: "jump" },
      ],
    };
    const componentsFactory = jest.fn();
    const component = jest.fn();
    component.mockReturnValue(null);
    componentsFactory.mockReturnValue(component);

    render(<RenderContainer />, {
      wrapper: ({ children }) => <ConfigProvider value={{ template, componentsFactory, behaviors: {} as any }}>{children}</ConfigProvider>,
    });

    expect(componentsFactory).toBeCalledTimes(template.components.length);
    template.components.forEach((data, index) => {
      expect(componentsFactory.mock.calls[index][0]).toEqual(data.type);
      expect(component.mock.calls[index][0].data).toEqual(data);
    });
  });
});
