import { Card, Suits, Types } from "./deck";
import { DealStrategy, ScoringStrategy } from "./game";

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

export const scoponeDeal: DealStrategy = (cards, playersCount) => {
  if (playersCount <= 0) throw new Error("number of players is zero");
  const cardsOfPlayers: Card[][] = Array.from({ length: playersCount }, () => []);
  let table: Card[] = [];

  while (cards.length) {
    if (cardsOfPlayers[0].length < 9 && cards.length > 0) {
      cardsOfPlayers.forEach((cardOfPlayer) => {
        cardOfPlayer.push(...cards.splice(0, 3));
      });
    }

    if (table.length < 4 && cards.length > 0) {
      table = table.concat(cards.splice(0, 2));
    }
  }

  return {
    cardsOfPlayers,
    table,
  };
};

export const scoreSettle: ScoringStrategy = (playedResults) => {
  let temp = {
    counts: [0, 0, -1],
    denaris: [0, 0, -1],
    settebello: -1,
    rebello: -1,
    points: [0, 0, -1],
  };

  temp = playedResults.reduce((acc, played, index) => {
    const compute = (temp: number[], value: number) => {
      if (value > temp[0]) {
        temp = [value, 1, index];
      } else if (value === temp[0]) {
        temp = [value, temp[1] + 1, -1];
      }

      return temp;
    };
    acc.counts = compute(acc.counts, played.captured.length);
    acc.denaris = compute(acc.denaris, played.captured.filter((c) => c.suit === Suits.Denari).length);
    acc.points = compute(acc.points, played.maxOfSuits);

    if (played.captured.find((card) => card.suit === Suits.Denari && card.type === Types.SEVEN)) {
      acc.settebello = index;
    }
    if (played.captured.find((card) => card.suit === Suits.Denari && card.type === Types.KING)) {
      acc.rebello = index;
    }
    return acc;
  }, temp);

  return playedResults.map((played, index) => {
    let total = played.scopa;

    const compute = (v: number) => {
      if (v === index) {
        total += 1;
      }
    };
    compute(temp.counts[2]);
    compute(temp.denaris[2]);
    compute(temp.points[2]);

    return total;
  });
};
