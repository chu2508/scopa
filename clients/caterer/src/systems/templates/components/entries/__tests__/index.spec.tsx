import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EntriesComponentData, ComponentType } from "../../../interface";
import { ConfigProvider } from "../../../context";
import { Entries } from "..";

describe("Entries ", () => {
  const data: EntriesComponentData = {
    type: ComponentType.ENTRIES,
    name: "entries",
    rowSize: 3,
    blocks: [
      { icon: "icon1", path: "link1" },
      { icon: "icon1", path: "link1" },
    ],
    behavior: "jump",
  };
  test("正确的渲染组件", () => {
    const { getAllByTestId } = render(<Entries data={data} />, {
      wrapper: ({ children }) => <ConfigProvider value={{ behaviors: {} } as any}>{children}</ConfigProvider>,
    });

    const imageElements = getAllByTestId("icon");

    expect(imageElements).toHaveLength(data.blocks.length);

    imageElements.forEach((img, index) => {
      expect(img).toHaveAttribute("src", data.blocks[index].path);
    });

    const blocks = getAllByTestId("block");

    expect(blocks[0]).toHaveStyle({ width: `${(100 / data.rowSize).toFixed(4)}%` });
  });

  test("点击block应该用正确的参数调用navigateTo", async () => {
    const navigateTo = jest.fn();
    const { getAllByTestId } = render(<Entries data={data} />, {
      wrapper: ({ children }) => <ConfigProvider value={{ behaviors: { navigateTo } } as any}>{children}</ConfigProvider>,
    });

    const imageElements = getAllByTestId("icon");

    await userEvent.click(imageElements[0]);

    expect(navigateTo).toBeCalledWith(data.blocks[0].path);
  });
});
