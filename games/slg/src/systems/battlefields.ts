import { System } from "nopun-ecs";
import { Coordinate, PIXIContainerRef } from "../components";
import { Sprite, SCALE_MODES } from "pixi.js";
import img from "./base-green.png";

export class BattlefieldSystem extends System {
  static queries = {
    cells: [PIXIContainerRef, Coordinate],
  };
  execute(): void {
    for (const cell of this.queries.cells.added) {
      const { current: container } = cell.get(PIXIContainerRef);
      const coordinate = cell.get(Coordinate);
      const width = 100;
      const height = 100;

      const imgWidth = 200;
      const imageHeight = 200;
      const paddingX = 20;

      const sprite = Sprite.from(img);

      sprite.scale.set(width / imgWidth, height / imageHeight);
      const y = coordinate.row * height + height / 2;
      const x = coordinate.col * (width - paddingX) + width / 2;
      const offsetY = (coordinate.row * -(height - 40)) / 2;
      const offsetX = coordinate.row % 2 === 0 ? 0 : (width - paddingX) / 2;
      sprite.anchor.set(0.5);
      sprite.position.set(x + offsetX, y + offsetY);

      container.addChild(sprite);
    }
  }
}
