import { ComponentType, IBizComponent } from "../interface";

const map: Map<ComponentType, IBizComponent> = new Map([[ComponentType.BUTTON, () => null]]);

export const componentFactory = (type: ComponentType): IBizComponent => {
  if (map.has(type)) {
    return map.get(type)!;
  } else {
    throw new Error(`未找到类型为${type}的组件`);
  }
};
