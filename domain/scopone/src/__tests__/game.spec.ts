import { Card, Suits, Types } from "../deck";
import { Game, GameStatus } from "../game";
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
    const mockDealFn = jest.fn();
    mockDealFn.mockReturnValue({ table, cardsOfPlayers });

    const game = new Game(users, 0, mockDealFn);

    expect(game.status).toBe(GameStatus.DEALT);
    expect(game.table).toEqual(table);
    expect(mockDealFn).toBeCalled();
    expect(mockDealFn.mock.calls[0][1]).toBe(users.length);
    expect(game.currentPlayer).toEqual(game.players[1]);
    expect(game.players[1].cards).toEqual(cardsOfPlayers[0]);
    expect(game.players[2].cards).toEqual(cardsOfPlayers[1]);
    expect(game.players[3].cards).toEqual(cardsOfPlayers[2]);
    expect(game.players[0].cards).toEqual(cardsOfPlayers[3]);
  });

  test("should reshuffle if the table has three king cards", () => {
    const users = createUsers();
    const table: Card[] = [
      { type: Types.KING, suit: Suits.Bastoni },
      { type: Types.KING, suit: Suits.Coppe },
      { type: Types.KING, suit: Suits.Denari },
      { type: Types.KING, suit: Suits.Spade },
    ];
    const cardsOfPlayers: Card[][] = [
      [{ type: Types.ACE, suit: Suits.Bastoni }],
      [{ type: Types.TWO, suit: Suits.Bastoni }],
      [{ type: Types.THREE, suit: Suits.Bastoni }],
      [{ type: Types.FOUR, suit: Suits.Bastoni }],
    ];
    const table2: Card[] = [
      { type: Types.FIVE, suit: Suits.Bastoni },
      { type: Types.SIX, suit: Suits.Bastoni },
      { type: Types.SEVEN, suit: Suits.Bastoni },
      { type: Types.JACK, suit: Suits.Bastoni },
    ];

    const mockDealFn = jest.fn();
    mockDealFn.mockReturnValueOnce({ table, cardsOfPlayers });
    mockDealFn.mockReturnValueOnce({ table: table2, cardsOfPlayers });

    const game = new Game(users, 0, mockDealFn);

    expect(mockDealFn).toBeCalledTimes(2);
    expect(game.table).toEqual(table2);
  });
});
