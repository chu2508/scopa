import { Player } from "./../player";
import { Room, RoomStatus } from "./../room";

const createPlayer = (id = 1): Player => {
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
    expect(room.playersCount).toBe(1);
    expect(room.owner).toEqual(tPlayer);
    expect(room.status).toEqual(RoomStatus.READYING);
  });

  test("player should join the game correctly", () => {
    const tPlayer = createPlayer(2);
    const room = createRoom();

    let result = room.join(tPlayer);

    expect(result.isRight()).toBeTruthy();
    expect(room.isFulled).toBeFalsy();
    expect(room.playersCount).toBe(2);

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
    expect(room.status).toBe(RoomStatus.READY);
  });
});
