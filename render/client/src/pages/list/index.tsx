import { ScrollView, View } from "@tarojs/components";

export default function TodoList() {
  return (
    <View className='h-full flex flex-row'>
      <View className='flex-shrink rounded-md border border-dashed border-gray-300 mb-2 text-center w-full px-2' onClick={() => {}}>
        ADD
      </View>
      <ScrollView className='flex-1' scrollY></ScrollView>
    </View>
  );
}
