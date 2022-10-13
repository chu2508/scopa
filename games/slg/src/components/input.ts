import { Entity, IComponent } from "../core";

export type ClickEvent = { type: "click"; x: number; y: number };

export class Clickable implements IComponent {
  entity: Entity | null = null;
  constructor(public onClick: (event: ClickEvent) => void) {}
}
