import { v4 as uuid } from "uuid";
import { Player } from "./player";

export class Game {
  private _id: string = uuid();
  private scoreboard: Map<number, number> = new Map();

  constructor(private _players: Player[]) {
    _players.forEach((player) => this.scoreboard.set(player.id, 0));
  }
}

export interface GameResult {}
