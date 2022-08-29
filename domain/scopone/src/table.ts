import { compute } from "./core";
import { Card, TypeValues } from "./deck";

export class Table {
  private _cards: Card[];

  constructor(cards: Card[]) {
    this._cards = cards;
  }

  receive(placed: Card[]) {
    this._cards = this._cards.concat(placed);
  }

  match(target: Card): Card[][] {
    const result: number[][] = [];
    const copied = this._cards.map((v) => ({ ...v })).sort(({ type: type1 }, { type: type2 }) => TypeValues[type2] - TypeValues[type1]);
    compute(
      copied.map(({ type }) => TypeValues[type]),
      result,
      [],
      TypeValues[target.type],
      0
    );

    return result.map((indexes) => indexes.map((idx) => copied[idx]));
  }

  get cards() {
    return this._cards;
  }
}
