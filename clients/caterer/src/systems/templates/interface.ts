export interface TemplateData {
  id: number;
  name: string;
  components: ComponentData[];
}

export interface ComponentData {
  type: ComponentType;
  name: string;
  behavior: BehaviorData;
}

export enum ComponentType {
  BUTTON = "BUTTON",
}

export type BehaviorData = "jump";

export interface BehaviorExecute {
  (): void;
}

export interface BehaviorExecutor {
  execute(): void;
}

export type IBehavior = BehaviorExecute | BehaviorExecutor;

export type IBizComponent = ComponentData;
