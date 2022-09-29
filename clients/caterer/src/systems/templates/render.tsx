import { View } from "@tarojs/components";
import { useContext } from "react";
import { ConfigContext } from "./context";

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

export const Render = () => {};
