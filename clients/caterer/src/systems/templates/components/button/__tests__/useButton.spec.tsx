import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { ComponentType } from "../../../interface";
import { ButtonContextData, useButton } from "../useButton";

describe("useButton", () => {
  test("在click时执行behavior", async () => {
    const behavior = jest.fn();

    const context: ButtonContextData = {
      component: { name: "mockname", type: ComponentType.BUTTON, behavior: "jump" },
      behavior,
    };

    const MockCom = () => {
      const { onClick } = useButton(context);
      return <div onClick={onClick}>click btn</div>;
    };

    const { getByText } = render(<MockCom />);

    await userEvent.click(getByText("click btn"));

    expect(behavior).toBeCalledTimes(1);
  });
});
