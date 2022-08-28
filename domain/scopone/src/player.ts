import { Card } from "./deck";
import { User } from "./user";

export class Player implements User {
  private _cards: Card[] = [];
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
}
