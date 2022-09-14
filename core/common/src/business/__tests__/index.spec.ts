import dayjs from "dayjs";
import { BusinessDates } from "../index";

describe("BusinessDates tests", () => {
  test("如果使用正确的参数创建BusinessDates，应该返回BusinessDates实例", () => {
    let dates = new BusinessDates([], [{ begin: "10:00", end: "20:00" }]);

    expect(dates).toBeDefined();

    dates = new BusinessDates(
      Array.from({ length: 6 }, (_, v) => v),
      [{ begin: "10:00", end: "20:00" }]
    );

    expect(dates).toBeDefined();
  });

  test("如果使用无效的参数创建BusinessDates，应该抛出Error", () => {
    expect(() => new BusinessDates(Array.from({ length: 8 }), [{ begin: "10:00", end: "20:00" }])).toThrowError();
    expect(() => new BusinessDates([0, 0], [{ begin: "10:00", end: "20:00" }])).toThrowError();
    expect(() => new BusinessDates([7], [{ begin: "10:00", end: "20:00" }])).toThrowError();
    expect(() => new BusinessDates([], Array.from({ length: 4 }))).toThrowError();
    expect(() => new BusinessDates([], [])).toThrowError();
    expect(() => new BusinessDates([], [{ begin: "11", end: "20" }])).toThrowError();
    expect(() => new BusinessDates([], [{ begin: "11:00", end: "x:x" }])).toThrowError();
  });

  test("调用isOpen应该正确的返回结果", () => {
    const target = dayjs("2022-09-11 09:00");
    const now = dayjs("2022-09-11 09:00");

    let dates = new BusinessDates([], [{ begin: "08:00", end: "20:00" }]);

    expect(dates.isOpen(target.toDate(), now.toDate())).toBeTruthy();
    expect(dates.isOpen(dayjs("2022-09-11 22:00").toDate(), now.toDate())).toBeFalsy();

    dates = new BusinessDates([0], [{ begin: "08:00", end: "20:00" }]);

    expect(dates.isOpen(target.toDate(), now.toDate())).toBeTruthy();
    expect(dates.isOpen(dayjs("2022-09-12 22:00").toDate(), now.toDate())).toBeFalsy();

    dates = new BusinessDates([0, 1, 2, 3, 4, 5, 6], [{ begin: "08:00", end: "02:00" }]);

    expect(dates.isOpen(dayjs("2022-09-12 1:00").toDate(), now.toDate())).toBeTruthy();
    expect(dates.isOpen(dayjs("2022-09-12 22:00").toDate(), now.toDate())).toBeFalsy();
  });
});
