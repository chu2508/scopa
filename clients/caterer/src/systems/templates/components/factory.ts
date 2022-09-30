import { ComponentType, IBizComponent } from "../interface";
import { Entries } from "./entries";

const map: Map<ComponentType, IBizComponent> = new Map([[ComponentType.ENTRIES, Entries]]);

export const componentFactory = (type: ComponentType): IBizComponent => {
  if (map.has(type)) {
    return map.get(type)!;
  } else {
    throw new Error(`未找到类型为${type}的组件`);
  }
};
