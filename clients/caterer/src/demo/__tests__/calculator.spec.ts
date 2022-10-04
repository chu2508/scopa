import dayjs from "dayjs";
import { BookMode, BookTimeCalculator, ceilForInterval } from "../calculator";

const formatStr = "YYYY-MM-DD HH:mm";

describe("BookTimeCalculator", () => {
  describe("单段营业时间，LIMIT mode", () => {
    let calculator: BookTimeCalculator;

    beforeEach(() => {
      calculator = new BookTimeCalculator("08:00-20:00", BookMode.LIMIT);
    });

    test("如果当前时间不在营业时间区间内， calculate方法应该返回空数组", () => {
      const current = dayjs("2020-10-11 07:59");

      expect(calculator.calculate(current)).toHaveLength(0);
    });

    test("如果当前时间分钟数为10的整数倍，calculate方法应该返回正确的结果", () => {
      const current = dayjs("2020-10-11 08:00");

      const result = calculator.calculate(current);
      expect(result).toHaveLength(6);
      expect(result[0].format(formatStr)).toBe("2020-10-11 08:10");
      expect(result[1].format(formatStr)).toBe("2020-10-11 08:20");
      expect(result[2].format(formatStr)).toBe("2020-10-11 08:30");
      expect(result[3].format(formatStr)).toBe("2020-10-11 08:40");
      expect(result[4].format(formatStr)).toBe("2020-10-11 08:50");
      expect(result[5].format(formatStr)).toBe("2020-10-11 09:00");
    });

    test("如果当前时间分钟数不为10的整数倍，calculate方法应该返回正确的结果", () => {
      const current = dayjs("2020-10-11 08:03");

      const result = calculator.calculate(current);

      expect(result).toHaveLength(6);
      expect(result[0].format(formatStr)).toBe("2020-10-11 08:20");
      expect(result[1].format(formatStr)).toBe("2020-10-11 08:30");
      expect(result[2].format(formatStr)).toBe("2020-10-11 08:40");
      expect(result[3].format(formatStr)).toBe("2020-10-11 08:50");
      expect(result[4].format(formatStr)).toBe("2020-10-11 09:00");
      expect(result[5].format(formatStr)).toBe("2020-10-11 09:10");
    });

    test("如果当前时间距离营业结束时间小于10分钟，calculate方法应该返回空数组", () => {
      const current = dayjs("2020-10-11 19:55");

      const result = calculator.calculate(current);

      expect(result).toHaveLength(0);
    });
  });

  describe("多段营业时间，LIMIT mode", () => {
    let calculator: BookTimeCalculator;

    beforeEach(() => {
      calculator = new BookTimeCalculator("08:00-12:00;12:30-20:00", BookMode.LIMIT);
    });

    test("如果当前时间不在营业时间区间内， calculate方法应该返回空数组", () => {
      let current = dayjs("2020-10-11 07:59");

      expect(calculator.calculate(current)).toHaveLength(0);

      current = dayjs("2020-10-11 12:15");

      expect(calculator.calculate(current)).toHaveLength(0);

      current = dayjs("2020-10-11 20:01");

      expect(calculator.calculate(current)).toHaveLength(0);
    });

    test("如果当前时间分钟数为10的整数倍，calculate方法应该返回正确的结果", () => {
      let current = dayjs("2020-10-11 13:00");

      let result = calculator.calculate(current);

      expect(result).toHaveLength(6);
      expect(result[0].format(formatStr)).toBe("2020-10-11 13:10");
      expect(result[1].format(formatStr)).toBe("2020-10-11 13:20");
      expect(result[2].format(formatStr)).toBe("2020-10-11 13:30");
      expect(result[3].format(formatStr)).toBe("2020-10-11 13:40");
      expect(result[4].format(formatStr)).toBe("2020-10-11 13:50");
      expect(result[5].format(formatStr)).toBe("2020-10-11 14:00");

      current = dayjs("2020-10-11 19:30");

      result = calculator.calculate(current);

      expect(result).toHaveLength(3);
      expect(result[0].format(formatStr)).toBe("2020-10-11 19:40");
      expect(result[1].format(formatStr)).toBe("2020-10-11 19:50");
      expect(result[2].format(formatStr)).toBe("2020-10-11 20:00");
    });
  });

  describe("单段营业时间，NOT_LIMIT mode", () => {
    let calculator: BookTimeCalculator;

    beforeEach(() => {
      calculator = new BookTimeCalculator("08:00-20:00", BookMode.NOT_LIMIT);
    });

    test("如果当前时间不在营业时间区间内， calculate方法应该返回空数组", () => {
      const current = dayjs("2020-10-11 07:59");

      expect(calculator.calculate(current)).toHaveLength(0);
    });

    test("如果当前时间分钟数为10的整数倍，calculate方法应该返回正确的结果", () => {
      const current = dayjs("2020-10-11 08:00");

      const result = calculator.calculate(current);
      expect(result).toHaveLength(72);
      Array.from({ length: 72 }, (_, index) => {
        expect(result[index].format(formatStr)).toBe(current.add(10 * (index + 1), "minute").format(formatStr));
      });
    });

    test("如果当前时间分钟数不为10的整数倍，calculate方法应该返回正确的结果", () => {
      const current = dayjs("2020-10-11 18:03");

      const result = calculator.calculate(current);

      expect(result).toHaveLength(11);
      Array.from({ length: 11 }, (_, index) => {
        expect(result[index].format(formatStr)).toBe(
          current
            .set("minute", 10)
            .add(10 * (index + 1), "minute")
            .format(formatStr)
        );
      });
    });
  });

  describe("多段营业时间，NOT_LIMIT mode", () => {
    let calculator: BookTimeCalculator;

    beforeEach(() => {
      calculator = new BookTimeCalculator("08:00-12:00;12:30-20:00", BookMode.NOT_LIMIT);
    });

    test("如果当前时间不在营业时间区间内， calculate方法应该返回空数组", () => {
      let current = dayjs("2020-10-11 07:59");

      expect(calculator.calculate(current)).toHaveLength(0);

      current = dayjs("2020-10-11 12:15");

      expect(calculator.calculate(current)).toHaveLength(0);

      current = dayjs("2020-10-11 20:01");

      expect(calculator.calculate(current)).toHaveLength(0);
    });

    test("如果当前时间分钟数为10的整数倍，calculate方法应该返回正确的结果", () => {
      let current = dayjs("2020-10-11 13:00");

      let result = calculator.calculate(current);

      expect(result).toHaveLength(42);
      Array.from({ length: 42 }, (_, index) => {
        expect(result[index].format(formatStr)).toBe(current.add(10 * (index + 1), "minute").format(formatStr));
      });

      current = dayjs("2020-10-11 19:30");

      result = calculator.calculate(current);

      expect(result).toHaveLength(3);
      expect(result[0].format(formatStr)).toBe("2020-10-11 19:40");
      expect(result[1].format(formatStr)).toBe("2020-10-11 19:50");
      expect(result[2].format(formatStr)).toBe("2020-10-11 20:00");
    });

    test("如果当前时间分钟数不为10的整数倍，calculate方法应该返回正确的结果", () => {
      const current = dayjs("2020-10-11 09:03");

      const result = calculator.calculate(current);

      expect(result).toHaveLength(17);
      Array.from({ length: 17 }, (_, index) => {
        expect(result[index].format(formatStr)).toBe(
          current
            .set("minute", 10)
            .add(10 * (index + 1), "minute")
            .format(formatStr)
        );
      });
    });
  });
});

describe("ceilForInterval", () => {
  const tests = [
    { value: 3, interval: 10, expect: 7 },
    { value: 10, interval: 10, expect: 0 },
    { value: 13, interval: 10, expect: 7 },
    { value: 20, interval: 10, expect: 0 },
    { value: 3, interval: 5, expect: 2 },
    { value: 5, interval: 5, expect: 0 },
    { value: 10, interval: 5, expect: 0 },
    { value: 13, interval: 5, expect: 2 },
  ];

  tests.forEach((item) => {
    test(`if value = ${item.value}, interval = ${item.interval}, expected should = ${item.expect}`, () => {
      expect(ceilForInterval(item.value, item.interval)).toBe(item.expect);
    });
  });
});
