import { IComponent } from "./component.h";

type ComponentConstructor<C extends IComponent> = {
  new (...args: any[]): C;
};

export abstract class Entity {
  readonly components: IComponent[] = [];

  addComponent(comp: IComponent) {
    this.components.push(comp);
    comp.entity = this;
  }

  removeComponent<C extends IComponent>(constr: ComponentConstructor<C>) {
    const index = this.components.findIndex((comp) => comp instanceof constr);
    if (index > -1) {
      const [comp] = this.components.splice(index, 1);
      comp.entity = null;
    }
  }

  hasComponent<C extends IComponent>(constr: ComponentConstructor<C>) {
    return this.components.findIndex((comp) => comp instanceof constr) > -1;
  }

  getComponent<C extends IComponent>(constr: ComponentConstructor<C>): C | undefined {
    const index = this.components.findIndex((comp) => comp instanceof constr);
    if (index > -1) {
      return this.components[index] as C;
    }
  }
}
