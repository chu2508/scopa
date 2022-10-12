import { IComponent, Entity, Vec2 } from "../core";

export class Animation implements IComponent {
  entity: Entity | null = null;
  private startTimestamp = 0;
  private lastTimestamp = 0;
  private started = false;
  private current: Vec2;
  private finished = false;
  private deltaVec: Vec2;
  private start: Vec2;

  constructor(start: Vec2, private end: Vec2, private duration: number) {
    this.start = { ...start };
    this.current = { ...start };
    this.deltaVec = { x: this.end.x - this.start.x, y: this.end.y - this.start.y };
  }

  run(startTimestamp: number) {
    if (this.started) return;
    this.started = true;
    this.startTimestamp = startTimestamp;
  }

  update(timestamp: number) {
    if (this.finished) return;
    if (!this.started) {
      this.run(timestamp);
    } else {
      const deltaTime = timestamp - this.startTimestamp;

      const c = deltaTime / this.duration;

      let x = Math.min(this.end.x, this.start.x + this.deltaVec.x * c);
      let y = Math.min(this.end.y, this.start.y + this.deltaVec.y * c);

      this.current.x = x;
      this.current.y = y;

      this.lastTimestamp = timestamp;
      if (deltaTime >= this.duration) {
        this.finished = true;
      }
    }
  }

  get isFinished() {
    return this.finished;
  }

  get currentPoint() {
    return this.current;
  }
}
