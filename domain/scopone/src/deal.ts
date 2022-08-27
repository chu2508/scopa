import { Card } from "./deck";
import { DealStrategy } from "./game";

export const scoponeDeal: DealStrategy = (cards, numberOfPlayers) => {
  if (numberOfPlayers <= 0) throw new Error("number of players is zero");
  const cardsOfPlayers: Card[][] = Array.from({ length: numberOfPlayers }, () => []);
  let table: Card[] = [];

  while (cards.length) {
    if (cardsOfPlayers[0].length < 9 && cards.length > 0) {
      cardsOfPlayers.forEach((cardOfPlayer) => {
        cardOfPlayer.push(...cards.splice(0, 3));
      });
    }

    if (table.length < 4 && cards.length > 0) {
      table = table.concat(cards.splice(0, 2));
    }
  }

  return {
    cardsOfPlayers,
    table,
  };
};
