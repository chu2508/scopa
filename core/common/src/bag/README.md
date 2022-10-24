# 我们不用很累很麻烦就可以TDD

Test driven developments

## 基本概念

what way how
什么是TDD，为什么要用TDD，怎么用TDD

## 小栗子🌰

### 示例的背景

游戏中的背包系统

// 背景介绍与需求描述
游戏《暗黑破坏神》中的装备，每个都有他的大小，比如一个棍子，他的大小就是4*1=4格，而游戏中的背包也有一个固定的大小，那么怎么分配这个背包的空间就成为一个问题。

### 示例中的需求

我们的需求就是实现这个背包系统，并做一个一键整理的按钮，将装备在背包中，按从上到下，从左到右，从小到大的顺序排列。

## 怎么实现

### 需求分析

1. 背包可以放入装备
2. 背包可以移出装备
3. 背包中的装备可以被移动到别的位置
4. 背包能整理装备

### 简要设计

```ts
interface IArticle {
    width: number
    height: number
    readonly area: number
}

interface IUnique {
    id: number
}
// 位置接口，描述对象在一个二维平面上的位置
interface IPosition {
    readonly x: number
    readonly y: number
    set(x: number, y: number): void
}

interface Content extends IArticle & IUnique & IPosition {}

// 网格类，背包功能的底层实现
class Grid {
    readonly width: number
    readonly height: number
    readonly values: number[]
    set(x: number, y: number, value: number): void
    get(x: number, y: number): number
    getPositions(value: number): IPosition[]
}

class Bag<T extends Content> {
    grid: Grid;
    put(article: T, position: IPosition): void
    move(id: number, position: IPosition): void
    remove(id: number): void
    sort(): void
}
```

### 测试用例

BDD Business driven developments

背包系统UI

  1. 应该渲染背包对应大小的网格放置区域
  2. 应该在放置区域的正确位置渲染物品
  3. 拖拽整理背包内的物品
  4. 一键整理按钮

背包系统Core
