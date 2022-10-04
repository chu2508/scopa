import dayjs from "dayjs";
import { WorkTimes } from "../work-times";

describe("WorkTimes", () => {
  describe("单段时间区间字符串", () => {
    test("如果是单段时间区间，应该被正确的解析", () => {
      const workTimes = new WorkTimes("08:00-20:00");

      expect(workTimes.isInvalided).toBeFalsy();
    });

    test("如果当前时间小于营业时间开始时间，返回undefined", () => {
      const workTimes = new WorkTimes("08:00-20:00");
      const current = dayjs("2022-02-10 07:59");

      expect(workTimes.getRange(current)).toBeUndefined();
    });

    test("如果当前时间大于营业开始时间，返回undefined", () => {
      const workTimes = new WorkTimes("08:00-20:00");
      const current = dayjs("2022-02-10 20:01");

      expect(workTimes.getRange(current)).toBeUndefined();
    });

    test("如果当前时间在营业区间内，返回这个区间", () => {
      const workTimes = new WorkTimes("08:00-20:00");
      const current = dayjs("2022-02-10 10:01");

      const range = workTimes.getRange(current);

      expect(range).toHaveLength(2);
      expect(range?.[0].format("YYYY-MM-DD HH:mm")).toBe("2022-02-10 08:00");
      expect(range?.[1].format("YYYY-MM-DD HH:mm")).toBe("2022-02-10 20:00");
    });
  });

  describe("多时段区间字符串", () => {
    test("如果是多端时间区间，应该被正确的解析", () => {
      const workTimes = new WorkTimes("08:00-12:00;12:30-22:00");

      expect(workTimes.isInvalided).toBeFalsy();
    });

    test("如果当前时间小于营业时间开始时间，返回undefined", () => {
      const workTimes = new WorkTimes("08:00-12:00;12:30-22:00");
      const current = dayjs("2020-12-11 07:59");

      expect(workTimes.getRange(current)).toBeUndefined();
    });
    test("如果当前时间大于营业时间结束时间，返回undefined", () => {
      const workTimes = new WorkTimes("08:00-12:00;12:30-22:00");
      const current = dayjs("2020-12-11 22:01");

      expect(workTimes.getRange(current)).toBeUndefined();
    });
    test("如果当前时间在两段营业时间间隔之间，返回undefined", () => {
      const workTimes = new WorkTimes("08:00-12:00;12:30-22:00");
      const current = dayjs("2020-12-11 12:10");

      expect(workTimes.getRange(current)).toBeUndefined();
    });
    test("如果当前时间在任意一段营业时间之间，返回对应的营业时间区间", () => {
      const workTimes = new WorkTimes("08:00-12:00;12:30-22:00");
      let current = dayjs("2020-12-11 09:00");

      let range = workTimes.getRange(current);

      expect(range).toHaveLength(2);
      expect(range?.[0].format("YYYY-MM-DD HH:mm")).toBe("2020-12-11 08:00");
      expect(range?.[1].format("YYYY-MM-DD HH:mm")).toBe("2020-12-11 12:00");

      current = dayjs("2020-12-11 14:00");

      range = workTimes.getRange(current);

      expect(range).toHaveLength(2);
      expect(range?.[0].format("YYYY-MM-DD HH:mm")).toBe("2020-12-11 12:30");
      expect(range?.[1].format("YYYY-MM-DD HH:mm")).toBe("2020-12-11 22:00");
    });
  });

  describe("无效字符串", () => {
    test("空字符串解析", () => {
      const workTimes = new WorkTimes("");

      expect(workTimes.isInvalided).toBeTruthy();
    });
    test("时间格式错误字符串解析", () => {
      const workTimes = new WorkTimes("aa:11-10:11");

      expect(workTimes.isInvalided).toBeTruthy();
    });
    test("如果是无效的营业时间，获取营业时间区间，应该永远返回undefined", () => {
      const workTimes = new WorkTimes("aa:11-10:11");
      const current = dayjs("2020-12-11 09:59");

      expect(workTimes.getRange(current)).toBeUndefined();
    });
  });
});
