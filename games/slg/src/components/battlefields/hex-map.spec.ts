import { HexMap } from "./hex-map";

describe(">>> HexMap", () => {
  let map: HexMap;

  beforeEach(() => {
    map = new HexMap();
    map.rows = 5;
    map.columns = 5;
  });

  it("getIndex", () => {
    expect(map.getIndex(0, 0)).toBe(0);
    expect(map.getIndex(4, 4)).toBe(24);
    expect(map.getIndex(4, 0)).toBe(4);
    expect(map.getIndex(0, 4)).toBe(20);
    expect(map.getIndex(1, 4)).toBe(21);
  });

  it("getCoordinates", () => {
    const coordinates = map.coordinates;

    expect(coordinates[map.getIndex(0, 0)]).toEqual({ col: 0, row: 0 });
    expect(coordinates[map.getIndex(4, 4)]).toEqual({ col: 4, row: 4 });
    expect(coordinates[map.getIndex(4, 0)]).toEqual({ col: 4, row: 0 });
    expect(coordinates[map.getIndex(0, 4)]).toEqual({ col: 0, row: 4 });
    expect(coordinates[map.getIndex(1, 4)]).toEqual({ col: 1, row: 4 });
  });
});
