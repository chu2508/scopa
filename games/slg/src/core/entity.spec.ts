import { IComponent } from "./component.h";
import { Entity } from "./entity";

class C1 implements IComponent {
  entity: Entity | null = null;
}

class C2 implements IComponent {
  entity: Entity | null = null;
}

class MockEntity extends Entity {}

describe(">>> Entity", () => {
  let entity: Entity;
  let c1: C1;
  let c2: C2;
  beforeEach(() => {
    entity = new MockEntity();
    c1 = new C1();
    c2 = new C2();
  });

  it("应该正确的添加Component", () => {
    entity.addComponent(c1);
    entity.addComponent(c2);

    expect(entity.components).toHaveLength(2);
    expect(entity.components[0]).toBe(c1);
    expect(entity.components[1]).toBe(c2);

    expect(c1.entity).toBe(entity);
    expect(c2.entity).toBe(entity);
  });

  it("应该正确的删除Component", () => {
    entity.addComponent(c1);
    entity.addComponent(c2);

    expect(entity.components).toHaveLength(2);
    expect(entity.components[0]).toBe(c1);
    expect(entity.components[1]).toBe(c2);

    entity.removeComponent(C1);

    expect(entity.components).toHaveLength(1);
    expect(entity.components[0]).toBe(c2);

    expect(c1.entity).toBeNull();
  });

  it("应该返回Truthy，如果Component被添加到Entity中", () => {
    entity.addComponent(c1);

    expect(entity.hasComponent(C1)).toBeTruthy();
  });
});
