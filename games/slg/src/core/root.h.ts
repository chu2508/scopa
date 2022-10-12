import { IComponent } from "./component.h";

interface ConstructorFun<T> {
  new (...args: any[]): IComponent;
}

export type ComponentConstrList = readonly [...ConstructorFun<any>[]];

export type MaybeTypes<Tuple extends ComponentConstrList> = {
  [Index in keyof Tuple]: InstanceType<Tuple[Index]>;
} & { length: Tuple["length"] };

export interface IRoot {
  query<List extends ComponentConstrList>(...comps: List): MaybeTypes<List>[];
}
