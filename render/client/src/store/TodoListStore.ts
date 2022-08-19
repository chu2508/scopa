import { Todo as TodoEntity } from "@domain/todo";
import { makeAutoObservable } from "mobx";

export class Todo extends TodoEntity {
  constructor(...arg: ConstructorParameters<typeof TodoEntity>) {
    super(...arg);
    makeAutoObservable(this);
  }
}

export class TodoListStore {
  list: Todo[] = [];
  constructor() {
    makeAutoObservable(this);
  }
}
