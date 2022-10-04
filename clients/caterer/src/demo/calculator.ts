import { Dayjs } from "dayjs";
import { WorkTimes } from "./work-times";

export enum BookMode {
  /** 限制最多一个小时 */
  LIMIT = 1,
  /** 无限制 */
  NOT_LIMIT,
}

export class BookTimeCalculator {
  private static INTERVAL_MINUTE = 10;
  private static MAX_MINUTE = 60 - BookTimeCalculator.INTERVAL_MINUTE;
  private workTimes: WorkTimes;
  private mode: BookMode;
  constructor(times: string, mode: BookMode) {
    this.workTimes = new WorkTimes(times);
    this.mode = mode;
  }

  calculate(current: Dayjs): Dayjs[] {
    const range = this.workTimes.getRange(current);
    if (!range) return [];
    const [_, end] = range;

    const diffMinute = ceilForInterval(current.minute(), BookTimeCalculator.INTERVAL_MINUTE);
    let start = current.add(diffMinute + BookTimeCalculator.INTERVAL_MINUTE, "minute");
    const limitEnd = this.mode === BookMode.LIMIT ? start.add(BookTimeCalculator.MAX_MINUTE, "minute") : end;

    const result: Dayjs[] = [];

    while (!start.isAfter(end, "minute") && !start.isAfter(limitEnd, "minute")) {
      result.push(start);
      start = start.add(BookTimeCalculator.INTERVAL_MINUTE, "minute");
    }

    return result;
  }
}

/**
 * 将number向右取整为target的整数倍，
 * @example
 * ```
 * ceilForInterval(3, 10) //返回7
 * ceilForInterval(10, 10) //返回0
 * ceilForInterval(20, 10) //返回0
 * ceilForInterval(3, 5) //返回2
 * ceilForInterval(5, 5) //返回0
 * ceilForInterval(10, 5) //返回0
 * ```
 * @param number 当前值
 * @param target 取整的目标数, 必须为正整数
 */
export const ceilForInterval = (number: number, target: number): number => {
  const remainder = number % target;
  return remainder ? target - remainder : remainder;
};
