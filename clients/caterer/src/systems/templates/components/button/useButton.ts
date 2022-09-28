import { IBehavior, ComponentData } from "../../interface";

export interface ButtonContextData {
  component: ComponentData;
  behavior: IBehavior;
}

export const useButton = (context: ButtonContextData): { onClick: () => void } => {
  const behavior = context.behavior;
  return {
    onClick: () => {
      if (typeof behavior === "function") {
        behavior();
      } else {
        behavior.execute();
      }
    },
  };
};
