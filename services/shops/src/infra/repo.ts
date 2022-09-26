import { BusinessDates } from "@core/common";
import { Injectable } from "@nestjs/common";
import { Shop as ShopModel } from "@prisma/client";
import { Shop, ShopRepo } from "../domain/shop";
import { ShopPrismaService } from "./db";

@Injectable()
export class ShopRepoImpl implements ShopRepo {
  constructor(private _prisma: ShopPrismaService) {}

  async save(shop: Shop): Promise<void> {
    const exist = await this._prisma.shop.count({
      where: {
        id: shop.id,
      },
    });

    const model: ShopModel = {
      id: shop.id,
      name: shop.name,
      location_json_str: JSON.stringify(shop.location),
      business_dates_json_str: JSON.stringify(shop.businessDates.toJSON()),
    };

    if (!!exist) {
      await this._prisma.shop.update({
        data: model,
        where: { id: shop.id },
      });
    } else {
      await this._prisma.shop.create({
        data: model,
      });
    }
  }

  async findBy(id: string): Promise<Shop | undefined> {
    const model = await this._prisma.shop.findUnique({
      where: { id: id },
    });

    if (!model) return;

    const businessDatesModel = JSON.parse(model.business_dates_json_str);

    const shop = Shop.fromDB({
      ...model,
      location: JSON.parse(model.location_json_str),
      businessDates: businessDatesModel.isFull ? BusinessDates.FULL_BUSINESS_DATE : BusinessDates.fromJSON(businessDatesModel),
    });
    return shop;
  }
}
