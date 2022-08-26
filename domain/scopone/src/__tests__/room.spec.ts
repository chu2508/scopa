import { Player } from "./../player";
import { Room, RoomStatus } from "./../room";
describe("Room tests", () => {
  test("should create a game correctly", () => {
    const tPlayer: Player = {
      id: 1,
      nickname: "test user",
      avatar: "",
    };
    const tRoomName = "test room";

    const room = new Room(tPlayer, tRoomName);

    expect(room.isFulled).toBeFalsy();
    expect(room.playersCount).toBe(1);
    expect(room.owner).toEqual(tPlayer);
    expect(room.status).toEqual(RoomStatus.READYING);
  });
});
