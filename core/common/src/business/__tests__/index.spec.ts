import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import dayjs from "dayjs";
import { BusinessDates } from "../index";

describe("BusinessDates tests", () => {
  test("如果使用正确的参数创建BusinessDates，应该返回BusinessDates实例", () => {
    let dates = BusinessDates.create([], [{ begin: "10:00", end: "20:00" }]);

    expect(dates).toBeDefined();

    dates = BusinessDates.create(
      Array.from({ length: 6 }, (_, v) => v),
      [{ begin: "10:00", end: "20:00" }]
    );

    expect(dates).toBeDefined();
  });

  test("如果使用无效的参数创建BusinessDates，应该抛出Error", () => {
    expect(() => BusinessDates.create(Array.from({ length: 8 }), [{ begin: "10:00", end: "20:00" }])).toThrowError();
    expect(() => BusinessDates.create([0, 0], [{ begin: "10:00", end: "20:00" }])).toThrowError();
    expect(() => BusinessDates.create([7], [{ begin: "10:00", end: "20:00" }])).toThrowError();
    expect(() => BusinessDates.create([], Array.from({ length: 4 }))).toThrowError();
    expect(() => BusinessDates.create([], [])).toThrowError();
    expect(() => BusinessDates.create([], [{ begin: "11", end: "20" }])).toThrowError();
    expect(() => BusinessDates.create([], [{ begin: "11:00", end: "x:x" }])).toThrowError();
  });

  test("调用isOpen应该正确的返回结果", () => {
    const target = dayjs("2022-09-11 09:00");
    const now = dayjs("2022-09-11 09:00");

    let dates = BusinessDates.create([], [{ begin: "08:00", end: "20:00" }]);

    expect(dates.isOpen(target.toDate(), now.toDate())).toBeTruthy();
    expect(dates.isOpen(dayjs("2022-09-11 22:00").toDate(), now.toDate())).toBeFalsy();

    dates = BusinessDates.create([0], [{ begin: "08:00", end: "20:00" }]);

    expect(dates.isOpen(target.toDate(), now.toDate())).toBeTruthy();
    expect(dates.isOpen(dayjs("2022-09-12 22:00").toDate(), now.toDate())).toBeFalsy();

    dates = BusinessDates.create([0, 1, 2, 3, 4, 5, 6], [{ begin: "08:00", end: "02:00" }]);

    expect(dates.isOpen(dayjs("2022-09-12 1:00").toDate(), now.toDate())).toBeTruthy();
    expect(dates.isOpen(dayjs("2022-09-12 22:00").toDate(), now.toDate())).toBeFalsy();
  });

  test("business class transform", () => {
    const time1 = { begin: "10:00", end: "20:00" };
    let dates = BusinessDates.create([], [time1]);

    const plain = instanceToPlain(dates);

    expect(plain.days).toHaveLength(0);
    expect(plain.times).toHaveLength(1);
    expect(plain.times[0]).toEqual(time1);

    const instance = plainToInstance<BusinessDates, any>(BusinessDates as any, plain);

    expect(instance.days).toHaveLength(0);
    expect(instance.times).toHaveLength(1);
    expect(instance.times[0]).toEqual(time1);
  });
});
