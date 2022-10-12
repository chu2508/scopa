import { Shape } from "../components/style";
import { IRoot, ISystem, Vec2 } from "../core";

export class CanvasSystem implements ISystem {
  constructor(private root: IRoot, private ctx: CanvasRenderingContext2D, private size: Vec2) {}

  exec(): void {
    const entities = this.getEntities();
    // 循环每个实体绘制他们的形状
    entities.forEach((comps) => {
      this.ctx.clearRect(0, 0, this.size.x, this.size.y);
      comps[0].draw(this.ctx);
    });
  }

  private getEntities() {
    return this.root.query(Shape);
  }
}
