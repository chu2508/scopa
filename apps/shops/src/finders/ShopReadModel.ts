import { ShopSimpleDTO } from "./ShopSimpleDTO";
export interface ShopReadModel {
  paging(pageNumber: number, pageSize: number): Promise<[ShopSimpleDTO[], number]>;
}
