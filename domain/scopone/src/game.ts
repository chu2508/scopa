import { Either, Left } from "purify-ts";
import { v4 as uuid } from "uuid";
import { Card, Deck, Types } from "./deck";
import { Player } from "./player";
import { Table } from "./table";
import { User } from "./user";

export enum GameStatus {
  DEALT = "DEALT",
  CLOSED = "CLOSED",
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
  matched: Card[][];
  captured: Card[];
}

export interface PlayedResult {
  scopa: number;
  captured: Card[];
}
export interface ScoringStrategy {
  (playedResults: PlayedResult[]): number[];
}

export class Game {
  private _id: string = uuid();
  private _scoreboard: Map<number, number> = new Map();
  private _deck: Deck;
  private _status: GameStatus = GameStatus.DEALT;
  private _dealerIndex: number;
  private _players: Player[] = [];
  private _currentPlayerIndex: number;
  private _table: Table = new Table([]);
  private _dealStrategy: DealStrategy;
  private _scoringStrategy: ScoringStrategy;

  constructor(users: User[], dealerIndex: number, dealStrategy: DealStrategy, scoringStrategy: ScoringStrategy) {
    this._dealStrategy = dealStrategy;
    this._scoringStrategy = scoringStrategy;

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

    const { cardsOfPlayers, table: cardsOfTable } = this._dealStrategy(cards, this._players.length);
    this._table = new Table(cardsOfTable);

    let index = this._dealerIndex;
    cardsOfPlayers.forEach((cardOfPlayer) => {
      index = this._getNextPlayerIndex(index);

      this._players[index].receive(cardOfPlayer);
    });

    const kingCards = this._table.cards.reduce((acc, card) => (card.type === Types.KING ? acc + 1 : acc), 0);

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
    return this._table.cards;
  }

  get status() {
    return this._status;
  }

  get players() {
    return this._players;
  }

  get end() {
    return this._players[this._dealerIndex].cards.length === 0;
  }

  // TODO 这个函数目前做了太多的事情了，后续可以进行优化
  place(id: number, placedCard: Card, capturedCards: Card[]): Either<Error, PlaceResult> {
    return Either.encase(() => {
      if (this.end) throw new Error("the game is end");
      if (this.currentPlayer.id !== id) throw new Error(`the id '${id}'is not the id of current player`);
      if (!this.currentPlayer.has([placedCard]))
        new Error(`not found card '${placedCard.suit}-${placedCard.type}' in the player '${this.currentPlayer.nickname}'`);
    }).chain(() => {
      return this.currentPlayer
        .place(placedCard)
        .toEither(new Error(`not found card '${placedCard.suit}-${placedCard.type}' in the player '${this.currentPlayer.nickname}'`))
        .chain(() => {
          const matchedResult = this._table.match(placedCard);

          if (capturedCards.length) {
            const hasCaptured = matchedResult.some((matched) =>
              matched.every((card) => capturedCards.some((c) => c.type === card.type && c.suit === card.suit))
            );
            if (!hasCaptured) return Left(new Error("captured cards not's on the table"));
            this._table.remove(capturedCards);
            this.currentPlayer.capture(this._table.cards.length === 0, [placedCard, ...capturedCards]);
          } else {
            this._table.receive([placedCard]);
          }

          this._currentPlayerIndex = this._getNextPlayerIndex();

          return Either.of({
            scopa: false,
            placed: placedCard,
            matched: matchedResult,
            captured: capturedCards,
          });
        });
    });
  }

  settle() {
    if (!this.end || this._status === GameStatus.CLOSED) return;
    this._status = GameStatus.CLOSED;

    const scored = this._scoringStrategy(this._players);

    scored.map((score, index) => {
      this._scoreboard.set(this._players[index].id, score);
    });
  }
}
