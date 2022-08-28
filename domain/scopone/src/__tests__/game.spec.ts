import { Card, Suits, Types } from "../deck";
import { Game } from "../game";
import { User } from "../user";

const createUsers = (): User[] => {
  return Array.from({ length: 4 }, (_, id) => ({ id: id + 1, nickname: `name ${id}`, avatar: "" }));
};

describe("Game test", () => {
  test("should create a game correctly", () => {
    const users = createUsers();
    const table: Card[] = [
      { type: Types.FIVE, suit: Suits.Bastoni },
      { type: Types.SIX, suit: Suits.Bastoni },
      { type: Types.SEVEN, suit: Suits.Bastoni },
      { type: Types.JACK, suit: Suits.Bastoni },
    ];
    const cardsOfPlayers: Card[][] = [
      [{ type: Types.ACE, suit: Suits.Bastoni }],
      [{ type: Types.TWO, suit: Suits.Bastoni }],
      [{ type: Types.THREE, suit: Suits.Bastoni }],
      [{ type: Types.FOUR, suit: Suits.Bastoni }],
    ];

    const game = new Game(users, 0, () => {
      return {
        cardsOfPlayers,
        table,
      };
    });

    expect(game.table).toEqual(table);
    expect(game.currentPlayer).toEqual(game.players[1]);
    expect(game.players[1].cards).toEqual(cardsOfPlayers[0]);
    expect(game.players[2].cards).toEqual(cardsOfPlayers[1]);
    expect(game.players[3].cards).toEqual(cardsOfPlayers[2]);
    expect(game.players[0].cards).toEqual(cardsOfPlayers[3]);
  });
});
