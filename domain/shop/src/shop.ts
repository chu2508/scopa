import { Location } from "@core/common";
import { arrayMaxSize, arrayMinSize, arrayUnique } from "class-validator";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export class Shop {
  private _id!: string;
  private _name!: string;
  private _location!: Location;
  private _businessDates!: BusinessDates;
}

export type TimeRange = { begin: string; end: string };

export class BusinessDates {
  constructor(days: number[], times: TimeRange[]) {
    if (!arrayMaxSize(days, 7)) {
      throw new Error("营业日最多只能配置7天");
    }
    if (!arrayUnique(days)) {
      throw new Error("营业日不可重复配置");
    }
    if (days.some((day) => day < 0 || day >= 7)) {
      throw new Error("营业日取值范围0-6");
    }
    if (!arrayMinSize(times, 1)) {
      throw new Error("至少配置一个营业时间段");
    }
    if (!arrayMaxSize(times, 3)) {
      throw new Error("最多只能配置3个营业时间段");
    }
    const regex = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
    if (times.some(({ begin, end }) => !regex.test(begin) || !regex.test(end))) {
      throw new Error("营业时间段内的时间格式错误");
    }

    this._days = days;
    this._times = times;
  }

  private _days: number[];
  private _times: TimeRange[];

  isOpen(target: Date, now: Date): boolean {
    const isFullDays = this._days.length === 0;
    let inDays = true;
    if (!isFullDays) {
      inDays = this._days.includes(target.getDay());
    }

    const tDay = dayjs(target);
    const nDateStr = dayjs(now).format("YYYY-MM-DD");

    return (
      inDays &&
      this._times.some((item) => {
        let [begin, end] = [dayjs(`${nDateStr} ${item.begin}`), dayjs(`${nDateStr} ${item.end}`)];
        if (!begin.isBefore(end, "minute")) {
          end = end.add(1, "day");
        }

        return tDay.isBetween(begin, end, "minute", "[]");
      })
    );
  }
}
