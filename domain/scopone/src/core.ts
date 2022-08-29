/**
 * 计算给定的数据源中可以组合成对应合（Combination Sum）的算法
 * 算法有经过修改以适应我们的需求
 * @see https://leetcode.com/problems/combination-sum/
 * @param originList 给定的数据源，需要从大到小排序
 * @param result 结果，保存的是数据源中对应位置的下标
 * @param tempList 临时数据
 * @param remain 剩余值
 * @param index 当前下标
 * @returns
 */
export function compute(originList: number[], result: number[][], tempList: number[], remain: number, index: number) {
  if (remain < 0) {
    return;
  } else if (remain === 0) {
    result.push([...tempList]);
    return;
  } else {
    for (let i = index; i < originList.length; i++) {
      const number = originList[i];
      tempList.push(i);
      compute(originList, result, tempList, remain - number, i + 1);
      tempList.pop();
    }
  }
}
