import { navigateTo } from "@tarojs/taro";
import { BehaviorExecute } from "../interface";

export const jumpBehavior: BehaviorExecute = () => {
  navigateTo({ url: "/pages/test/page" });
};
