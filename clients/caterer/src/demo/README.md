# 例子

通过一个小例子来实践一下TDD

## 业务场景描述

我们有一个供顾客使用的点餐应用，在这个应用中顾客可以下单购买食物，并且支持预定单。不过可预定的时间点有以下几个限制。

1. 预定时间点必须在门店的营业时间内。
2. 预定时间必须向右取整，如当前时间是15:03，向右取整的话是15:10
3. 预定时间点，以10分钟为间隔供顾客选择。
4. 预定时间点根据门店配置，可以是第一个可预定时间点开始的1个小时内，或者从下单时间到门店营业结束时间。

## 任务分解

1. 获取门店的配置信息
2. 门店营业时间的解析和转换
3. 计算出可用的预定时间点
4. UI样式与交互

## 简要设计

```typescript
enum BookMode {
    LIMIT = 1,
    NOT_LIMIT = 2
}

class WorkTimes {
    constructor(times:string) {}

    getTimeRange(current: Date): [Dayjs, Dayjs] | undefined
}

class BookTimeCalculator {
    private workTimes: WorkTimes
    private mode: BookMode

    constructor(times:string, mode: BookMode) {}

    calculate(current: Date): Date[] {}
}
```

## 测试用例

### 预定时间计算器

1. 使用正确的数据构建计算器
2. 使用无效的数据构建计算器

### 计算可用预定时间点

1. 在门店营业时间内
2. 不在门店营业时间内
3. 在门店营业开始时间
4. 在门店营业结束时间
