import { Room, RoomStatus } from "./../room";
import { User } from "./../user";

const createPlayer = (id = 1): User => {
  return {
    id,
    nickname: "test user " + id,
    avatar: "",
  };
};

const createRoom = (roomName = "test room") => {
  return new Room(createPlayer(), roomName);
};

describe("Room tests", () => {
  test("should create a game correctly", () => {
    const tPlayer = createPlayer();
    const tRoomName = "test room";

    const room = new Room(tPlayer, tRoomName);

    expect(room.isFulled).toBeFalsy();
    expect(room.userCount).toBe(1);
    expect(room.owner).toEqual(tPlayer);
    expect(room.status).toEqual(RoomStatus.READYING);
  });

  test("player should join the game correctly", () => {
    const tPlayer = createPlayer(2);
    const room = createRoom();

    let result = room.join(tPlayer);

    expect(result.isRight()).toBeTruthy();
    expect(room.isFulled).toBeFalsy();
    expect(room.userCount).toBe(2);

    result = room.join(tPlayer);

    expect(result.isRight()).toBeFalsy();
  });

  test("the status of room should changed correctly, if the room is fulled", () => {
    const room = createRoom();
    const tPlayer2 = createPlayer(2);
    const tPlayer3 = createPlayer(3);
    const tPlayer4 = createPlayer(4);

    room.join(tPlayer2);
    room.join(tPlayer3);
    room.join(tPlayer4);

    expect(room.isFulled).toBeTruthy();
    expect(room.userCount).toBe(4);
    expect(room.status).toBe(RoomStatus.READY);

    const result = room.join(createPlayer(5));

    expect(result.isLeft()).toBeTruthy();
  });

  test("player should leaved the room correctly", () => {
    const room = createRoom();
    const tPlayer = createPlayer(2);

    room.join(tPlayer);

    expect(room.userCount).toBe(2);

    let result = room.leave(tPlayer.id);

    expect(result.isRight()).toBeTruthy();
    expect(room.userCount).toBe(1);

    result = room.leave(tPlayer.id);

    expect(result.isRight()).toBeFalsy();
  });

  test("should changed owner of room correctly, if original owner of room leave", () => {
    const room = createRoom();
    const tPlayer = createPlayer(2);

    room.join(tPlayer);

    expect(room.owner).not.toEqual(tPlayer);

    room.leave(1);

    expect(room.owner).toEqual(tPlayer);

    room.leave(2);

    expect(room.status).toBe(RoomStatus.CLOSED);
  });

  test("status of room should be change to CLOSED, if last player of the room leave", () => {
    const room = createRoom();

    room.leave(1);

    expect(room.status).toBe(RoomStatus.CLOSED);
  });

  test("the room should has started correctly", () => {
    const room = createRoom();
    const tPlayer2 = createPlayer(2);
    const tPlayer3 = createPlayer(3);
    const tPlayer4 = createPlayer(4);

    room.join(tPlayer2);
    room.join(tPlayer3);

    let result = room.start();

    expect(result.isLeft()).toBeTruthy();

    room.join(tPlayer4);
    result = room.start();

    expect(result.isRight()).toBeTruthy();
  });
});
