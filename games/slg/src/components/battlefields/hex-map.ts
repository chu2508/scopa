export class HexMap {
  rows!: number;
  columns!: number;

  getIndex(col: number, row: number): number {
    return row * this.columns + col;
  }

  get coordinates() {
    const result: { col: number; row: number }[] = [];
    Array.from(
      {
        length: this.columns,
      },
      (_, y) =>
        Array.from({ length: this.rows }, (_, x) => {
          result.push({ col: x, row: y });
        })
    );

    return result;
  }
}
