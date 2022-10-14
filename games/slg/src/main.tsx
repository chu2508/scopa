import { Animation, Boundary, Clickable, Position, Shape } from "./components";
import { ComponentConstrList, Entity, IRoot, ISystem, MaybeTypes } from "./core";
import { AnimateSystem } from "./systems";
import { CanvasSystem } from "./systems/canvas";
import { MouseInputSystem } from "./systems/input";

class RectShape extends Shape {
  constructor(public fillColor: string) {
    super((ctx) => {
      if (this.entity) {
        const position = this.entity.getComponent(Position);
        const boundary = this.entity.getComponent(Boundary);

        if (!position || !boundary) return;

        ctx.fillStyle = this.fillColor;
        ctx.fillRect(position.cross.x, position.cross.y, boundary.size.x, boundary.size.y);
      } else {
        console.error(new Error("组件未绑定到实体上"));
      }
    });
  }
}

class MyEntity extends Entity {
  private index = 0;
  private colors = ["red", "blue", "green", "yellow"];
  constructor() {
    super();
    const position = new Position({ x: 0, y: 0 });
    const boundary = new Boundary({ x: 100, y: 100 }, { x: 1, y: 1 });
    const rectShape = new RectShape("red");
    const animation = new Animation(position.cross, { x: 100, y: 300 }, 1.5 * 1000);
    const clickable = new Clickable(() => {
      this.index = (this.index + 1) % this.colors.length;
      const color = this.colors[this.index];
      rectShape.fillColor = color;
      console.log({ ...position.cross });

      this.addComponent(new Animation(position.cross, { x: 300, y: 100 }, 1500));
    });

    this.addComponent(rectShape);
    this.addComponent(position);
    this.addComponent(boundary);
    this.addComponent(animation);
    this.addComponent(clickable);
  }
}

export class GameWorld implements IRoot {
  private _systems: ISystem[] = [];
  private _canvas!: HTMLCanvasElement;
  private _ctx!: CanvasRenderingContext2D;
  private _entities: Entity[] = [];

  query<List extends ComponentConstrList>(...comps: List): MaybeTypes<List>[] {
    const result: MaybeTypes<List>[] = [];

    // 循环每个实体，实体的组件列表如果匹配作为查询条件的IComponent构造函数，将对应的构造函数实例返回
    this._entities.reduce((acc, entity) => {
      let temp: any[] = [];

      comps.reduce((tempAcc, constr) => {
        if (entity.hasComponent(constr)) {
          tempAcc.push(entity.getComponent(constr));
        }
        return tempAcc;
      }, temp);

      if (temp.length === comps.length) {
        acc.push(temp as any);
      }

      return acc;
    }, result);
    return result;
  }

  run() {
    const size = { x: 500, y: 500 };
    this._canvas = document.createElement("canvas");
    this._canvas.width = size.x;
    this._canvas.height = size.y;
    this._canvas.style.border = "1px solid #333";
    this._ctx = this._canvas.getContext("2d")!;
    document.body.append(this._canvas);

    this._systems = [new MouseInputSystem(this, this._canvas), new CanvasSystem(this, this._ctx, size), new AnimateSystem(this)];

    this._entities.push(new MyEntity());

    window.requestAnimationFrame(this.update.bind(this));
  }

  update(delta: number) {
    this._systems.forEach((sys) => {
      sys.exec(delta);
    });

    window.requestAnimationFrame(this.update.bind(this));
  }
}

const world = new GameWorld();

world.run();
