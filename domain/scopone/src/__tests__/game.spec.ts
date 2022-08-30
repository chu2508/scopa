import { Card, Suits, Types } from "../deck";
import { Game, GameStatus } from "../game";
import { User } from "../user";

const createUsers = (): User[] => {
  return Array.from({ length: 4 }, (_, id) => ({ id: id + 1, nickname: `name ${id}`, avatar: "" }));
};

describe("init tests for game", () => {
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

    const game = new Game(users, 0, mockDealFn, () => []);

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

    const game = new Game(users, 0, mockDealFn, () => []);

    expect(mockDealFn).toBeCalledTimes(2);
    expect(game.table).toEqual(table2);
  });
});

const createMockData = () => {
  const users = createUsers();

  const table: Card[] = [
    { type: Types.ACE, suit: Suits.Bastoni },
    { type: Types.ACE, suit: Suits.Coppe },
    { type: Types.TWO, suit: Suits.Denari },
    { type: Types.FOUR, suit: Suits.Bastoni },
  ];
  const cardsOfPlayers: Card[][] = [
    [
      { type: Types.ACE, suit: Suits.Spade },
      { type: Types.TWO, suit: Suits.Spade },
      { type: Types.THREE, suit: Suits.Spade },
      { type: Types.FOUR, suit: Suits.Spade },
      { type: Types.FIVE, suit: Suits.Spade },
      { type: Types.SIX, suit: Suits.Spade },
      { type: Types.JACK, suit: Suits.Spade },
    ],
    [{ type: Types.KING, suit: Suits.Bastoni }],
    [{ type: Types.KING, suit: Suits.Coppe }],
    [{ type: Types.KING, suit: Suits.Denari }],
  ];

  const dealFn = () => {
    return {
      table,
      cardsOfPlayers,
    };
  };
  const scoringFn = () => {
    return [];
  };

  return {
    table,
    cardsOfPlayers,
    dealFn,
    users,
    scoringFn,
  };
};

describe("playing tests for game", () => {
  test("current player should place and capture cards correctly", () => {
    const { users, dealFn, scoringFn } = createMockData();
    const captured = [
      { type: Types.ACE, suit: Suits.Coppe },
      { type: Types.TWO, suit: Suits.Denari },
    ];
    const card = { type: Types.THREE, suit: Suits.Spade };
    const game = new Game(users, 0, dealFn, scoringFn);

    const result = game.place(users[1].id, card, captured);

    expect(result.isRight()).toBeTruthy();
    expect(result.extract()).toEqual({
      scopa: false,
      placed: card,
      captured: captured,
      matched: [
        [
          { type: Types.TWO, suit: Suits.Denari },
          { type: Types.ACE, suit: Suits.Bastoni },
        ],
        [
          { type: Types.TWO, suit: Suits.Denari },
          { type: Types.ACE, suit: Suits.Coppe },
        ],
      ],
    });
    expect(game.table).toEqual([
      { type: Types.ACE, suit: Suits.Bastoni },
      { type: Types.FOUR, suit: Suits.Bastoni },
    ]);
    expect(game.currentPlayer).toEqual(game.players[2]);
    expect(game.players[1].captured).toHaveLength(3);
    expect(game.players[1].scopa).toBe(0);
  });

  test("current player should can not capture cards", () => {
    const { users, dealFn, table, scoringFn } = createMockData();
    const captured: Card[] = [];
    const card = { type: Types.THREE, suit: Suits.Spade };
    const game = new Game(users, 0, dealFn, scoringFn);

    const result = game.place(users[1].id, card, captured);

    expect(result.isRight()).toBeTruthy();
    expect(game.players[1].captured).toHaveLength(0);
    expect(game.players[1].scopa).toBe(0);
    expect(game.table).toEqual([...table, card]);
  });
});
