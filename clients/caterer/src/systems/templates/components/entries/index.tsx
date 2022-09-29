import { Image, View } from "@tarojs/components";
import { useContext } from "react";
import { ConfigContext } from "../../context";
import { EntriesComponentData } from "../../interface";

export const Entries = ({ data }: { data: EntriesComponentData }) => {
  const { behaviors } = useContext(ConfigContext);
  const { blocks, rowSize } = data;

  return (
    <View className='flex flex-wrap'>
      {blocks.map((block, index) => (
        <View
          data-testid='block'
          style={{ width: `${(100 / rowSize).toFixed(4)}%` }}
          key={index}
          onClick={() => {
            behaviors.navigateTo(block.path);
          }}
        >
          <Image data-testid='icon' src={block.path} />
        </View>
      ))}
    </View>
  );
};
