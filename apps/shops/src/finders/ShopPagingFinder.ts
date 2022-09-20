import { PagingResult } from "@core/common";
import { ShopPagingQuery } from "../queries/ShopPagingQuery";
import { ShopReadModel } from "./ShopReadModel";
import { ShopSimpleDTO } from "./ShopSimpleDTO";
export class ShopPagingFinder {
  constructor(private _shopReadModel: ShopReadModel) {}

  async find(query: ShopPagingQuery): Promise<PagingResult<ShopSimpleDTO>> {
    const { pageNumber = 1, pageSize = 20 } = query;

    const [list, total] = await this._shopReadModel.paging(pageNumber, pageSize);

    return {
      list,
      pageNumber,
      pageSize,
      total,
    };
  }
}
