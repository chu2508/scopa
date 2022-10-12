import { Entity, IComponent } from "../core";
import { Boundary, Position } from "./layout";

export class Shape implements IComponent {
  entity: Entity | null = null;
  constructor(public draw: (ctx: CanvasRenderingContext2D) => void) {}
}
