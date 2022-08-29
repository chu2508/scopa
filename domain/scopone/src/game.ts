import { Either } from "purify-ts";
import { v4 as uuid } from "uuid";
import { Card, Deck, Types } from "./deck";
import { Player } from "./player";
import { User } from "./user";

export enum GameStatus {
  DEALT = "DEALT",
}

// 不同游戏模式下发牌的方式有所差异，所以抽象出发牌策略接口，方便测试与维护
export interface DealStrategy {
  (cards: Card[], numberOfPlayers: number): {
    cardsOfPlayers: Card[][];
    table: Card[];
  };
}

export interface PlaceResult {
  scopa: boolean;
  placed: Card;
  captured: Card[][];
}

export class Game {
  private _id: string = uuid();
  private _scoreboard: Map<number, number> = new Map();
  private _deck: Deck;
  private _status: GameStatus = GameStatus.DEALT;
  private _dealerIndex: number;
  private _players: Player[] = [];
  private _currentPlayerIndex: number;
  private _table: Card[] = [];
  private _dealStrategy: DealStrategy;

  constructor(users: User[], dealerIndex: number, dealStrategy: DealStrategy) {
    this._dealStrategy = dealStrategy;

    users.forEach((user) => {
      this._scoreboard.set(user.id, 0);
      this._players.push(new Player(user));
    });

    this._dealerIndex = dealerIndex;
    this._currentPlayerIndex = this._getNextPlayerIndex(this._dealerIndex);

    this._deck = new Deck();
    this._deal();
  }

  private _getNextPlayerIndex(dealerIndex?: number): number {
    let current = (dealerIndex ?? this._currentPlayerIndex) + 1;

    return current % this._players.length;
  }

  private _deal() {
    this._deck.shuffle();
    const cards = this._deck.cards;

    const { cardsOfPlayers, table } = this._dealStrategy(cards, this._players.length);
    this._table = table;

    let index = this._dealerIndex;
    cardsOfPlayers.forEach((cardOfPlayer) => {
      index = this._getNextPlayerIndex(index);

      this._players[index].receive(cardOfPlayer);
    });

    const kingCards = this._table.reduce((acc, card) => (card.type === Types.KING ? acc + 1 : acc), 0);

    if (kingCards >= 3) {
      this._deck = new Deck();
      this._players = this._players.map((player) => {
        const user = { id: player.id, nickname: player.nickname, avatar: player.avatar };
        return new Player(user);
      });
      this._deal();
    }
  }

  get currentPlayer() {
    return this._players[this._currentPlayerIndex];
  }

  get table() {
    return this._table;
  }

  get status() {
    return this._status;
  }

  get players() {
    return this._players;
  }

  place(id: number, card: Card): Either<Error, PlaceResult> {
    return Either.encase(() => {
      if (this.currentPlayer.id !== id) throw new Error(`the player id '${id}' not is current player`);
    }).chain(() => {
      return this.currentPlayer
        .place(card)
        .toEither(new Error(`not found card '${card.suit}-${card.type}' in the player '${this.currentPlayer.nickname}'`))
        .extend(() => {
          this._currentPlayerIndex = this._getNextPlayerIndex();
          const captured = this._matchTableCards(card);
          return {
            scopa: false,
            placed: { ...card },
            captured: captured,
          };
        });
    });
  }

  private _matchTableCards(card: Card): Card[][] {
    throw new Error("Method not implemented.");
  }
}
