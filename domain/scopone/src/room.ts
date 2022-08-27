import { Either } from "purify-ts";
import { scoponeDeal } from "./deal";
import { Game } from "./game";
import { User } from "./user";

export enum RoomStatus {
  READYING = "READYING",
  READY = "READY",
  CLOSED = "CLOSED",
  PLAYING = "PLAYING",
}

export class Room {
  private _users: User[] = [];
  private _status: RoomStatus = RoomStatus.READYING;
  private _games: Game[] = [];
  private _currentGame: Game | null = null;

  constructor(private _owner: User, private _name: string) {
    this._users.push(_owner);
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

  get userCount() {
    return this._users.length;
  }

  get isFulled() {
    return this._users.length >= 4;
  }

  join(user: User): Either<Error, Room> {
    return Either.encase(() => {
      const isJoined = this._users.findIndex(({ id }) => id === user.id) > -1;
      if (isJoined) throw new Error(`the user '${user.nickname}' has joined the room '${this.name}'`);
      if (this.isFulled) throw new Error(`the room '${this.name}' is fulled`);

      this._users.push(user);

      if (this.isFulled) this._status = RoomStatus.READY;

      return this;
    });
  }

  leave(id: number) {
    return Either.encase(() => {
      const userIndex = this._users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error(`not found the player by id '${id}'`);

      const [user] = this._users.splice(userIndex, 1);

      if (this.userCount === 0) {
        this._status = RoomStatus.CLOSED;
        return this;
      }

      if (user.id === this._owner.id) this._owner = this._users[0];

      return this;
    });
  }

  start() {
    return Either.encase(() => {
      if (!this.isFulled) throw new Error("room not is fulled");

      const dealerIndex = Math.floor(Math.random() * this._users.length);
      const game = new Game(this._users, dealerIndex, scoponeDeal);
      this._games.push(game);
      this._currentGame = game;
      this._status = RoomStatus.PLAYING;

      return this;
    });
  }
}
