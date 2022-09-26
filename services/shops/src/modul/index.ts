import { Module } from "@nestjs/common";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { ShopController } from "../controllers/index";
import { ShopPrismaService } from "../infra/db";
import { ShopRepoImpl } from "../infra/repo";
import { CreateShopHandler } from "./../cqrs/create-shop.handler";
import { UpdateShopHandler } from "./../cqrs/update-shop.handler";

const CommandHandlers = [CreateShopHandler, UpdateShopHandler];
@Module({
  imports: [CqrsModule],
  controllers: [ShopController],
  providers: [ShopPrismaService, ShopRepoImpl, ...CommandHandlers],
})
export class ShopModel {}
