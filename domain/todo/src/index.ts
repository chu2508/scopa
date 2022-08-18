import uuid from "uuid";

// export enum TodoStatus {
//   UNFINISHED = "UNFINISHED",
//   FINISHED = "FINISHED",
// }

export interface TodoStatus {
  next(): TodoStatus;
  readonly name: string;
  readonly value: string;
}

class UnfinishedStatus implements TodoStatus {
  next(): TodoStatus {
    return new FinishedStatus();
  }
  readonly name: string = "未完成";
  readonly value: string = "UNFINISHED";
}

class FinishedStatus implements TodoStatus {
  next(): TodoStatus {
    return this;
  }
  readonly name: string = "已完成";
  readonly value: string = "FINISHED";
}

export class Todo {
  static create(content: string) {
    return new Todo(uuid.v4(), new Date(), content, new UnfinishedStatus());
  }
  private constructor(private id: string, private createAt: Date, private content: string, private status: TodoStatus) {}
}
