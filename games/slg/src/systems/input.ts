import { Boundary, Clickable, ClickEvent, Position } from "../components";
import { IRoot, ISystem } from "../core";

export class MouseInputSystem implements ISystem {
  constructor(private root: IRoot, private canvas: HTMLCanvasElement) {
    this.canvas.addEventListener("click", this.onCanvasClick);
  }
  exec(delta: number): void {
    return;
  }

  onCanvasClick = (e: MouseEvent) => {
    const boundary = this.canvas.getBoundingClientRect();
    const x = e.pageX - boundary.x;
    const y = e.pageY - boundary.y;
    const event: ClickEvent = { type: "click", x, y };

    const entities = this.root.query(Clickable, Position, Boundary);

    entities.forEach(([clickable, position, boundary]) => {
      const boundRect = { sx: position.cross.x, sy: position.cross.y, ex: position.cross.x + boundary.size.x, ey: position.cross.y + boundary.size.y };

      if (event.x >= boundRect.sx && event.x <= boundRect.ex && event.y >= boundRect.sy && event.y <= boundRect.ey) {
        clickable.onClick(event);
      }
    });
  };
}
