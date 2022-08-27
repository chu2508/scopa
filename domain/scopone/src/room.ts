import { Either } from "purify-ts";
import { Game } from "./game";
import { Player } from "./player";

export enum RoomStatus {
  READYING = "READYING",
  READY = "READY",
  CLOSED = "CLOSED",
  PLAYING = "PLAYING",
}

export class Room {
  private _players: Player[] = [];
  private _status: RoomStatus = RoomStatus.READYING;
  private _games: Game[] = [];
  private _currentGame: Game | null = null;

  constructor(private _owner: Player, private _name: string) {
    this._players.push(_owner);
  }

  get name() {
    return this._name;
  }

  get owner() {
    return this._owner;
  }

  get status() {
    return this._status;
  }

  get playersCount() {
    return this._players.length;
  }

  get isFulled() {
    return this._players.length >= 4;
  }

  join(player: Player): Either<Error, Room> {
    return Either.encase(() => {
      const isJoined = this._players.findIndex(({ id }) => id === player.id) > -1;
      if (isJoined) throw new Error(`the user '${player.nickname}' has joined the room '${this.name}'`);
      if (this.isFulled) throw new Error(`the room '${this.name}' is fulled`);

      this._players.push(player);

      if (this.isFulled) this._status = RoomStatus.READY;

      return this;
    });
  }

  leave(id: number) {
    return Either.encase(() => {
      const playerIndex = this._players.findIndex((player) => player.id === id);
      if (playerIndex === -1) throw new Error(`not found the player by id '${id}'`);

      const [player] = this._players.splice(playerIndex, 1);

      if (this.playersCount === 0) {
        this._status = RoomStatus.CLOSED;
        return this;
      }

      if (player.id === this._owner.id) this._owner = this._players[0];

      return this;
    });
  }

  start() {
    return Either.encase(() => {
      if (!this.isFulled) throw new Error("room not is fulled");

      const game = new Game(this._players);
      this._games.push(game);
      this._currentGame = game;
      this._status = RoomStatus.PLAYING;

      return this;
    });
  }
}
