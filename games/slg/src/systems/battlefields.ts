import { System } from "nopun-ecs";
import { Grid, PIXIContainerRef, StageRef, TileMap } from "../components";
import { Sprite, Text } from "pixi.js";

export class BattlefieldSystem extends System {
  static queries = {
    fields: [PIXIContainerRef, TileMap, Grid],
  };
  initialize() {}
  execute(): void {
    const { current: stage } = this.scene.resources.get(StageRef);

    for (const field of this.queries.fields.added) {
      const container = field.get(PIXIContainerRef).current;
      const grid = field.get(Grid);
      const tiles = field.get(TileMap);

      const titleText = new Text("Title", {
        fontFamily: "Arial",
        fontSize: 80,
        fill: 0xffffff,
        align: "center",
      });
      const subtitleText = new Text("Subtitle", {
        fontFamily: "Arial",
        fontSize: 32,
        fill: 0xffffff,
        align: "center",
      });

      container.addChild(titleText);
      container.addChild(subtitleText);

      console.log("aaa", grid);

      grid.crosses.forEach((arr) => {
        arr.forEach((cross) => {
          const sprite = Sprite.from(tiles.getTexture(cross.x, cross.y));
          sprite.position.x = 0;
          sprite.position.y = 0;
          container.addChild(sprite);
        });
      });

      stage.addChild(container);

      console.log("execute", stage);
    }
  }
}
