import { Container } from "pixi.js";
import { Scene } from "nopun-ecs";
import { Grid, PIXIContainerRef, TileMap } from "../components";

export const createBattlefield = (scene: Scene) => {
  const container = new Container();

  scene.entities.create().add(PIXIContainerRef, { current: container }).add(Grid, { row: 10, col: 10 }).add(TileMap);
};
