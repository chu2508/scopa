export class Grid {
  private _values: (number | undefined)[];
  constructor(public readonly width: number, public readonly height: number) {
    this._values = Array.from({ length: this.area });
  }

  get area() {
    return this.width * this.height;
  }

  get values() {
    return this._values.slice();
  }

  set(x: number, y: number, value: number | undefined) {
    this._values[this._getIndex(x, y)] = value;
  }

  get(x: number, y: number): number | undefined {
    return this._values[this._getIndex(x, y)];
  }

  getRow(y: number): (number | undefined)[] {
    const start = this._getIndex(0, y);
    const end = start + this.width;

    return this._values.slice(start, end);
  }

  getCol(x: number): (number | undefined)[] {
    return Array.from({ length: this.height }, (_, y) => this.get(x, y));
  }

  setRow(y: number, value: number | undefined) {
    const start = this._getIndex(0, y);
    Array.from({ length: this.width }, (_, offset) => {
      const x = start + offset;
      this.set(x, y, value);
    });
  }

  setCol(x: number, value: number | undefined) {
    const start = this._getIndex(x, 0);

    Array.from({ length: this.height }, (_, offset) => {
      const y = start + offset;
      this.set(x, y, value);
    });
  }

  replace(originValue: number, targetValue: number | undefined) {
    this._values.forEach((value, index) => {
      if (value === originValue) {
        const { x, y } = this._getCoord(index);
        this.set(x, y, targetValue);
      }
    });
  }

  getValueMappings(): { x: number; y: number; value: number | undefined }[] {
    return this._values.map((value, index) => {
      return { ...this._getCoord(index), value };
    });
  }

  private _getCoord(index: number): { x: number; y: number } {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return { x, y };
  }

  private _getIndex(x: number, y: number): number {
    return y * this.width + x;
  }
}
