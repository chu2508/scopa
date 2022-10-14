import { Boundary, Shape } from "../components";
import { Entity, IComponent, Vec2 } from "../core";

type Cross = Vec2;

export class BattlefieldNodes implements IComponent {
  entity: Entity | null = null;
  nodes: [Cross, Boundary][] = [];
  constructor() {}
}

export class BattlefieldEntity extends Entity {
  private entities: Entity[] = [];
  constructor() {
    super();

    const grids = { x: 16, y: 16 };
    const size = { x: 30, y: 30 };
  }
}
