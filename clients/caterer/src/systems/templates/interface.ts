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

interface BehaviorExecute {
  (): void;
}

interface BehaviorExecutor {
  execute(): void;
}

export type IBehavior = BehaviorExecute | BehaviorExecutor;
