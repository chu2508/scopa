import bg1 from "./base-green.png";

const textures: Record<number, string> = {
  1: bg1,
};

export class TileMap {
  tiles: number[][] = [];

  constructor() {
    this.tiles = Array.from({ length: 10 }, () => {
      return Array.from({ length: 10 }, () => 1);
    });
  }

  getTexture(x: number, y: number) {
    const type = this.tiles[x][y];
    return textures[type];
  }
}
