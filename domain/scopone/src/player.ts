import { Card } from "./deck";
import { User } from "./user";

export class Player implements User {
  private cards: Card[] = [];
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
    return this.cards.length;
  }

  receive(cards: Card[]) {
    this.cards = this.cards.concat(cards);
  }
}
