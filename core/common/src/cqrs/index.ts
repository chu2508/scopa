export interface CommandHandler<C, R = void> {
  handle(cmd: C): Promise<R>;
}

export interface QueryFinder<Q, R> {
  find(query: Q): Promise<R>;
}
