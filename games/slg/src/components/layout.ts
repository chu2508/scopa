import { Entity, IComponent, Vec2 } from "../core";

export class Position implements IComponent {
  entity: Entity | null = null;
  constructor(public cross: Vec2) {}
}

export class Boundary implements IComponent {
  entity: Entity | null = null;
  constructor(public size: Vec2, public scale: Vec2) {}
}
