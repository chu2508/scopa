import { Maybe } from "purify-ts";
import { Card } from "./deck";
import { User } from "./user";

export class Player implements User {
  private _cards: Card[] = [];
  private _captured: Card[][] = [];
  private _scopa: number = 0;

  constructor(private _user: User) {}

  get id() {
    return this._user.id;
  }

  get nickname() {
    return this._user.nickname;
  }

  get avatar() {
    return this._user.avatar;
  }

  get cardCount() {
    return this._cards.length;
  }

  get cards() {
    return this._cards;
  }

  receive(cards: Card[]) {
    this._cards = this._cards.concat(cards);
  }

  place(card: Card): Maybe<Card> {
    const index = this._cards.findIndex((target) => target.suit === card.suit && target.type === card.type);

    if (index === -1) {
      return Maybe.empty();
    }
    return Maybe.of(this._cards.splice(index, 1)[0]);
  }

  capture(scopa: boolean, captured: Card[]) {
    this._scopa += scopa ? 1 : 0;
    this._captured.push(captured);
  }
}