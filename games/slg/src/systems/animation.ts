import { Animation, Position } from "../components";
import { ISystem, IRoot } from "../core";

export class AnimateSystem implements ISystem {
  constructor(private root: IRoot) {}

  exec(delta: number): void {
    const entities = this.getEntities();

    entities.forEach(([animation]) => {
      animation.update(delta);
      const position = animation.entity?.getComponent(Position);
      const current = animation.currentPoint;
      if (position) {
        position.cross.x = current.x;
        position.cross.y = current.y;
      }

      if (animation.isFinished) {
        animation.entity?.removeComponent(Animation);
      }
    });
  }

  private getEntities() {
    return this.root.query(Animation);
  }
}
