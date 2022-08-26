import { Either } from "purify-ts";
import { Player } from "./player";

export enum RoomStatus {
  READYING = "READYING",
}

export class Room {
  private players: Player[] = [];
  private readonly _owner: Player;
  private _status: RoomStatus = RoomStatus.READYING;

  constructor(owner: Player, private readonly name: string) {
    this.players.push(owner);
    this._owner = owner;
  }

  get owner() {
    return this._owner;
  }

  get status() {
    return this.isFulled ? this._status : RoomStatus.READYING;
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
      return this;
    });
  }
}
