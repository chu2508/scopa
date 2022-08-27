export interface Card {
  type: Types;
  suit: Suits;
}

export enum Suits {
  Denari = "DENARI",
  Bastoni = "BASTONI",
  Spade = "SPADE",
  Coppe = "COPPE",
}

export enum Types {
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SEVEN = "SEVEN",
  JACK = "JACK",
  QUEEN = "QUEEN",
  KING = "KING",
  ACE = "ACE",
}

export const TypeValues = {
  [Types.ACE]: 1,
  [Types.TWO]: 2,
  [Types.THREE]: 3,
  [Types.FOUR]: 4,
  [Types.FIVE]: 5,
  [Types.SIX]: 6,
  [Types.SEVEN]: 7,
  [Types.JACK]: 8,
  [Types.QUEEN]: 9,
  [Types.KING]: 10,
};

export const TypePrimes = {
  [Types.SEVEN]: 21,
  [Types.SIX]: 18,
  [Types.ACE]: 16,
  [Types.FIVE]: 15,
  [Types.FOUR]: 14,
  [Types.THREE]: 13,
  [Types.TWO]: 12,
  [Types.JACK]: 10,
  [Types.QUEEN]: 10,
  [Types.KING]: 10,
};

const types = [Types.TWO, Types.THREE, Types.FOUR, Types.FIVE, Types.SIX, Types.SEVEN, Types.JACK, Types.QUEEN, Types.KING, Types.ACE];
const suits = [Suits.Denari, Suits.Bastoni, Suits.Spade, Suits.Coppe];

export class Deck {
  private _cards: Card[] = [];

  constructor() {
    types.forEach((type) => {
      suits.forEach((suit) => {
        this._cards.push({
          type,
          suit,
        });
      });
    });
  }

  shuffle() {
    const cards = this._cards;
    let i = cards.length;

    while (--i) {
      let j = Math.floor(Math.random() * i);
      [cards[j], cards[i]] = [cards[i], cards[j]];
    }
  }

  get cards() {
    return this._cards;
  }
}
