import { NotFoundError, QueryFinder } from "@core/common";
import { ShopRepo } from "@domain/shops";
import { ShopDetailQuery } from "../queries/ShopDetailQuery";
import { ShopDetailDTO } from "./ShopDetailDTO";

export class ShopDetailFinder implements QueryFinder<ShopDetailQuery, ShopDetailDTO> {
  constructor(private _shopRepo: ShopRepo) {}

  async find(query: ShopDetailQuery): Promise<ShopDetailDTO> {
    const shop = await this._shopRepo.findBy(query.id);

    if (!shop) throw new NotFoundError("未找到门店");

    return ShopDetailDTO.fromDomain(shop);
  }
}
