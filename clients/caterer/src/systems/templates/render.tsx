import { View } from "@tarojs/components";
import { useContext } from "react";
import { componentFactory } from "./components/factory";
import { ConfigContext, ConfigProvider } from "./context";
import { TemplateData } from "./interface";

export const RenderContainer = () => {
  const { template, componentsFactory } = useContext(ConfigContext);
  const components = template.components;

  return (
    <View className='h-full bg-white'>
      {components.map((comData, index) => {
        const Com = componentsFactory(comData.type);

        return (
          <View key={index} className='mb-4'>
            <Com data={comData} />;
          </View>
        );
      })}
    </View>
  );
};

const navigateTo = () => {};

export const TemplateRender = ({ template }: { template: TemplateData }) => {
  return (
    <ConfigProvider value={{ template, componentsFactory: componentFactory, behaviors: { navigateTo } }}>
      <RenderContainer />
    </ConfigProvider>
  );
};
