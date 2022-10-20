import { Grid } from "./grid";
import { mockGrid } from "./__mocks__/index";

describe(">>> Grid", () => {
  describe("Grid instantiation", () => {
    it("should correctly instanced whit params", () => {
      const width = 10;
      const height = 20;

      const grid = new Grid(width, height);

      expect(grid.width).toBe(width);
      expect(grid.height).toBe(height);
      expect(grid.area).toBe(width * height);
    });
  });

  describe("Grid method", () => {
    it("should correctly set value when `set` called", () => {
      const value = 1;
      const { grid, width, height } = mockGrid();

      grid.set(0, 0, value);

      expect(grid.values[0]).toBe(value);

      grid.set(width - 1, height - 1, value);

      expect(grid.values[8]).toBe(value);

      grid.set(1, 1, value);

      expect(grid.values[4]).toBe(value);
    });

    it("should correctly returned value when `get` called", () => {
      const value = 10;
      const { grid } = mockGrid();

      expect(grid.get(1, 1)).toBeUndefined();

      grid.set(1, 1, value);

      expect(grid.get(1, 1)).toBe(value);
    });

    it("should correctly returned values when `getRow` called", () => {
      const values = [1, 2, 3];
      const { grid } = mockGrid();

      grid.set(0, 0, values[0]);
      grid.set(1, 0, values[1]);
      grid.set(2, 0, values[2]);

      expect(grid.getRow(0)).toEqual(values);
    });

    it("should correctly returned values when `getCol` called", () => {
      const values = [3, 2, 1];
      const { grid } = mockGrid();

      grid.set(0, 0, values[0]);
      grid.set(0, 1, values[1]);
      grid.set(0, 2, values[2]);

      expect(grid.getCol(0)).toEqual(values);
    });

    it("should correctly set values when `setRow` called", () => {
      const { grid } = mockGrid();

      grid.setRow(0, 1);

      expect(grid.getRow(0)).toEqual([1, 1, 1]);
    });

    it("should correctly set values when `setCol` called", () => {
      const { grid } = mockGrid();

      grid.setCol(0, 2);

      expect(grid.getCol(0)).toEqual([2, 2, 2]);
    });
  });
});
