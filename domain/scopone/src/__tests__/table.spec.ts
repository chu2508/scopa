import { Card } from "../deck";
import { Suits, Types } from "./../deck";
import { Table } from "./../table";

describe("Table tests", () => {
  test("应该正确的创建Table", () => {
    const cards: Card[] = [
      { type: Types.ACE, suit: Suits.Bastoni },
      { type: Types.ACE, suit: Suits.Coppe },
      { type: Types.TWO, suit: Suits.Bastoni },
      { type: Types.THREE, suit: Suits.Bastoni },
    ];

    const table = new Table(cards);

    expect(table.cards).toEqual(cards);
  });

  test("应该正确的接收卡片", () => {
    const cards: Card[] = [
      { type: Types.ACE, suit: Suits.Bastoni },
      { type: Types.ACE, suit: Suits.Coppe },
      { type: Types.TWO, suit: Suits.Bastoni },
      { type: Types.THREE, suit: Suits.Bastoni },
    ];
    const table = new Table([]);

    table.receive(cards);

    expect(table.cards).toEqual(cards);
  });

  test("应该正确的计算匹配的卡片组合", () => {
    const cards: Card[] = [
      { type: Types.ACE, suit: Suits.Bastoni },
      { type: Types.ACE, suit: Suits.Coppe },
      { type: Types.TWO, suit: Suits.Bastoni },
      { type: Types.THREE, suit: Suits.Bastoni },
    ];

    const table = new Table(cards);

    const result = table.match({ type: Types.THREE, suit: Suits.Spade });

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual([{ type: Types.THREE, suit: Suits.Bastoni }]);
    expect(result[1]).toEqual([
      { type: Types.TWO, suit: Suits.Bastoni },
      { type: Types.ACE, suit: Suits.Bastoni },
    ]);
    expect(result[2]).toEqual([
      { type: Types.TWO, suit: Suits.Bastoni },
      { type: Types.ACE, suit: Suits.Coppe },
    ]);
  });
});
