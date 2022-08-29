import { compute } from "../core";

describe("core tests", () => {
  test("算法应该正确的计算组合的结果", () => {
    let originList = [3, 2, 1, 1];
    let result: number[][] = [];
    let target = 3;

    compute(originList, result, [], target, 0);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual([0]);
    expect(result[1]).toEqual([1, 2]);
    expect(result[2]).toEqual([1, 3]);

    originList = [];
    result = [];
    target = 3;

    compute(originList, result, [], target, 0);

    expect(result).toHaveLength(0);

    originList = [11, 10, 4];
    result = [];
    target = 3;

    compute(originList, result, [], target, 0);

    expect(result).toHaveLength(0);
  });
});
