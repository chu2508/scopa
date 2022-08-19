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
  protected constructor(private id: string, private createAt: Date, private readonly _content: string, private status: TodoStatus) {}

  get content() {
    return this._content;
  }

  nextStatus() {
    this.status = this.status.next();
  }

  modify(content: string) {
    return new Todo(this.id, this.createAt, content, new UnfinishedStatus());
  }
}
