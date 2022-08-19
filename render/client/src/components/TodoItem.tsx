import { View } from "@tarojs/components";
import { memo, ReactNode, VFC } from "react";

export const TodoItem: VFC<{ content: string; onWrapClick?(): void; afterNode?: ReactNode }> = memo(({ content, onWrapClick, afterNode }) => {
  return (
    <View onClick={onWrapClick}>
      <View>{content}</View>
      {afterNode}
    </View>
  );
});
