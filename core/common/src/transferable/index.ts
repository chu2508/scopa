export interface Transferable {
  toJSON(): Record<string, any>;
}

export interface TransferableConstructor<T extends Transferable = Transferable> {
  fromJSON(obj: any): T;
}

export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
