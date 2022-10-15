import { Scene } from "nopun-ecs";
import { Container } from "pixi.js";
import { Coordinate, HexMap } from "../components";
import { PIXIContainerRef } from "../components/pixi";

export const createBattlefield = (scene: Scene) => {
  const map = scene.resources.get(HexMap);
  map.coordinates.forEach((coordinate) => {
    scene.entities
      .create()
      .add(PIXIContainerRef, { current: new Container() })
      .add(Coordinate, { ...coordinate });
  });
};
