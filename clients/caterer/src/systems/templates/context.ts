import { createContext } from "react";
import { ComponentType, IBizComponent, TemplateData } from "./interface";

export interface RenderConfig {
  template: TemplateData;
  componentsFactory: (data: ComponentType) => IBizComponent;
}
// 如果RenderConfig没有进行初始化，抛出Error
const defaultValueProxy = new Proxy<RenderConfig>({} as any, {
  get() {
    throw new Error("RenderConfig未进行初始化赋值");
  },
});

export const ConfigContext = createContext<RenderConfig>(defaultValueProxy);

export const ConfigProvider = ConfigContext.Provider;
