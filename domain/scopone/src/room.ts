import { Either } from "purify-ts";
import { Player } from "./player";

export enum RoomStatus {
  READYING = "READYING",
  READY = "READY",
  CLOSED = "CLOSED",
}

export class Room {
  private players: Player[] = [];
  private _status: RoomStatus = RoomStatus.READYING;

  constructor(private _owner: Player, private _name: string) {
    this.players.push(_owner);
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
    return this.players.length;
  }

  get isFulled() {
    return this.players.length >= 4;
  }

  join(player: Player): Either<Error, Room> {
    return Either.encase(() => {
      const isJoined = this.players.findIndex(({ id }) => id === player.id) > -1;
      if (isJoined) throw new Error(`the user '${player.nickname}' has joined the room '${this.name}'`);
      if (this.isFulled) throw new Error(`the room '${this.name}' is fulled`);

      this.players.push(player);

      if (this.isFulled) this._status = RoomStatus.READY;

      return this;
    });
  }

  leave(id: number) {
    return Either.encase(() => {
      const playerIndex = this.players.findIndex((player) => player.id === id);
      if (playerIndex === -1) throw new Error(`not found the player by id '${id}'`);

      const [player] = this.players.splice(playerIndex, 1);

      if (this.playersCount === 0) {
        this._status = RoomStatus.CLOSED;
        return this;
      }

      if (player.id === this._owner.id) this._owner = this.players[0];

      return this;
    });
  }
}
