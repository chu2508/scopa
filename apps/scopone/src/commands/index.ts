import { User } from "@domain/scopone";
import { IsNotEmptyObject, MaxLength, MinLength } from "class-validator";

export class NewRoomCommand {
  @MaxLength(20)
  @MinLength(4)
  name!: string;
  @IsNotEmptyObject()
  owner!: User;
}
