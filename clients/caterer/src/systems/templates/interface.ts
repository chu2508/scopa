import { FC } from "react";

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
  ENTRIES = "ENTRIES",
}

export type BehaviorData = "jump";

export interface BehaviorExecute {
  (): void;
}

export interface BehaviorExecutor {
  execute(): void;
}

export type IBehavior = BehaviorExecute | BehaviorExecutor;

export type IBizComponent = FC<{ data: ComponentData }>;

export interface EntriesComponentData extends ComponentData {
  type: ComponentType.ENTRIES;
  rowSize: number;
  blocks: { path: string; icon: string }[];
}
