type Cross = {
  x: number;
  y: number;
  type: TileType;
};

type Crosses = Cross[][];

export enum TileType {
  GROUND = 1,
}

/**
 * 这个类的职责是负责定义一个网格，每个Cell有其对应的坐标和类型数据
 */
export class Grid {
  private _crossList: Crosses | null = null;
  private _row: number = 10;
  private _col: number = 10;

  get row() {
    return this._row;
  }
  set row(value) {
    if (value !== this._row) {
      this._row = value;
      this._crossList = null;
    }
  }

  get col() {
    return this._col;
  }
  set col(value) {
    if (value !== this.col) {
      this._col = value;
      this._crossList = null;
    }
  }

  get crosses() {
    return this._crossList ? this._crossList : (this._crossList = this._createCrossList());
  }

  private _createCrossList(): Crosses {
    return Array.from({ length: this._col }, (_, x) => Array.from({ length: this._row }, (_, y) => ({ x, y, type: TileType.GROUND })));
  }
}
