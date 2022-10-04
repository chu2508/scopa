import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export class WorkTimes {
  private invalided: boolean;
  private ranges: [Dayjs, Dayjs][];

  constructor(times: string) {
    let timeRange: [Dayjs, Dayjs][] = times.split(";").map((rangeStr) => {
      const [begin, end] = rangeStr.split("-");
      if (!begin || !end) {
        this.invalided = true;
      }
      const nowDateStr = dayjs().format("YYYY-MM-DD");

      const beginDay = dayjs(`${nowDateStr} ${begin}`);
      const endDay = dayjs(`${nowDateStr} ${end}`);

      if (!beginDay.isValid() || !endDay.isValid()) {
        this.invalided = true;
      }
      return [beginDay, endDay];
    });

    if (this.invalided) {
      timeRange = [];
    }

    this.ranges = timeRange;
  }

  get isInvalided() {
    return this.invalided;
  }

  getRange(current: Dayjs) {
    const currentDate = current.format("YYYY-MM-DD");
    return this.ranges
      .map(([begin, end]) => {
        const currentBegin = dayjs(`${currentDate} ${begin.format("HH:mm")}`);
        const currentEnd = dayjs(`${currentDate} ${end.format("HH:mm")}`);
        return [currentBegin, currentEnd];
      })
      .find(([begin, end]) => {
        return current.isBetween(begin, end, "minute", "[]");
      });
  }
}
