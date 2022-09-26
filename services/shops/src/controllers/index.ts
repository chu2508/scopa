import { BadRequestException, Body, Controller, Injectable, Param, Post, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateShopCommand } from "../cqrs/create-shop.commad";
import { UpdateShopCommand } from "./../cqrs/update-shop.command";

@Controller("/shops")
@Injectable()
export class ShopController {
  constructor(private _commandBus: CommandBus) {}

  @Post()
  createShop(@Body() cmd: CreateShopCommand) {
    return this._commandBus.execute(cmd);
  }

  @Put("/:id")
  async updateShop(@Param("id") id: string, @Body() cmd: UpdateShopCommand) {
    cmd.id = id;
    return this._commandBus.execute(cmd);
  }
}
