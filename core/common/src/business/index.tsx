import { ClassConstructor, Exclude, Expose, instanceToPlain, plainToInstance } from "class-transformer";
import { arrayMaxSize, arrayMinSize, arrayUnique } from "class-validator";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { StaticImplements, Transferable, TransferableConstructor } from "../transferable";

dayjs.extend(isBetween);

export type TimeRange = { begin: string; end: string };

@Exclude()
@StaticImplements<TransferableConstructor>()
export class BusinessDates implements Transferable {
  private static _fullInstance: FullBusinessDates | null = null;
  static get FULL_BUSINESS_DATE() {
    return this._fullInstance ? this._fullInstance : (this._fullInstance = new FullBusinessDates());
  }
  protected constructor();
  protected constructor(days: number[], times: TimeRange[]);
  protected constructor(days?: number[], times?: TimeRange[]) {
    if (!days || !times) return this;

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

  @Expose({ name: "days" })
  private _days!: number[];
  @Expose({ name: "times" })
  private _times!: TimeRange[];

  get days() {
    return this._days;
  }

  get times() {
    return this._times;
  }

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

  toJSON() {
    return instanceToPlain(this);
  }

  static fromJSON(obj: any) {
    return plainToInstance(BusinessDates as unknown as ClassConstructor<BusinessDates>, obj);
  }

  static create(days: number[], times: TimeRange[]) {
    return new BusinessDates(days, times);
  }
}

export class FullBusinessDates extends BusinessDates {
  private static _instance: FullBusinessDates | null = null;
  private _fullDate = true;
  constructor() {
    super([], [{ begin: "00:00", end: "00:00" }]);
    return FullBusinessDates._instance ? FullBusinessDates._instance : (FullBusinessDates._instance = this);
  }

  get isFull() {
    return this._fullDate;
  }
}
