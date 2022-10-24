import { Grid } from "./grid";

export enum PlacingAngle {
  Zero = "ZERO",
  Right = "RIGHT",
}

export interface IArticle {
  id: number;
  width: number;
  height: number;
  angle: PlacingAngle;
}

export type IPosition = {
  x: number;
  y: number;
};

export class Bag {
  public readonly grid: Grid;
  constructor(public readonly width: number, public readonly height: number) {
    this.grid = new Grid(this.width, this.height);
  }

  get area() {
    return this.width * this.height;
  }

  get free() {
    return this.grid.values.filter((item) => item === undefined).length;
  }

  /**
   * 负责将物品放置到背包中
   * 如果有空闲的空间可以使用，将返回true表示放置成功
   * 如果没用空闲的空间可以使用，将返回false
   * @param article 被放置的物品
   * @returns boolean
   */
  put(article: IArticle) {
    const startPoint = this._getFreePosition(article);

    if (!startPoint) return false;

    return this._add(article, startPoint);
  }

  take(article: IArticle) {
    this.grid.replace(article.id, undefined);
  }

  private _canAdd(article: IArticle, startPoint: IPosition): boolean {
    const positions = this._getArticlePositions(article, startPoint);
    const empties = this.grid.values.reduce((acc, value) => (value === undefined ? (acc ?? 0) + 1 : acc), 0) ?? 0;

    if (empties <= article.height * article.height) return false;

    // 检查目标位置是否已经放了东西
    const hasSet = positions.some((coord) => {
      return this.grid.get(coord.x, coord.y) !== undefined;
    });

    return !hasSet;
  }

  private _add(article: IArticle, startPoint: IPosition): boolean {
    if (!this._canAdd(article, startPoint)) {
      return false;
    }

    // 将物品长宽映射成坐标位置
    const positions = this._getArticlePositions(article, startPoint);

    positions.forEach((point) => {
      this.grid.set(point.x, point.y, article.id);
    });

    return true;
  }

  private _getFreePosition(article: IArticle) {
    const positions = this.grid.getValueMappings();

    return positions.find((point) => this._canAdd(article, point));
  }

  private _getArticlePositions(article: IArticle, startPoint: IPosition): IPosition[] {
    const grid = new Grid(article.width, article.height);
    return grid.getValueMappings().map((item) => ({ x: item.x + startPoint.x, y: item.y + startPoint.y }));
  }
}
