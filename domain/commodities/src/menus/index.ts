import { BusinessDates } from "@core/common";
import { isDate, isEmpty, maxLength, minLength } from "class-validator";
import { v4 as uuid } from "uuid";
import { CommoditySKU } from "../commodities/CommoditySKU";

export class Category {
  constructor(private _id: number, private _sort: number) {}

  get id() {
    return this._id;
  }

  get sort() {
    return this._sort;
  }
}

export class MenuTemplateItem {
  private _commodityId: string;
  private _categoryId: number;
  private _skuList: CommoditySKU[] = [];
  private _labelId: string = "";
  private _saleDates?: BusinessDates;
  private _autoRemoveDate: string = "";
  private _sort: number;

  constructor(commodityId: string, categoryId: number, sort: number) {
    this._commodityId = commodityId;
    this._categoryId = categoryId;
    this._sort = sort;
  }

  get commodityId() {
    return this._commodityId;
  }

  private _canChangeSkuList(commoditySkuList: CommoditySKU[], targetSkuList: CommoditySKU[]) {
    const errors: Error[] = [];
    if (targetSkuList.length === 0) {
      return errors;
    }

    if (!commoditySkuList.every((oSku) => targetSkuList.find((tSku) => tSku.skuId === oSku.skuId))) {
      errors.push(new Error("自定义SKU与参数不匹配"));
    }
    return errors;
  }

  changeSkuList(commoditySkuList: CommoditySKU[], targetSkuList: CommoditySKU[]) {
    const errors = this._canChangeSkuList(commoditySkuList, targetSkuList);
    if (errors.length > 0) throw errors[0];

    this._skuList = targetSkuList;
  }

  changeLabel(labelId: string) {
    this._labelId = labelId;
  }

  changeSaleDates(saleDates: BusinessDates) {
    this._saleDates = saleDates;
  }

  changeAutoRemoveDate(date: string) {
    if (date && !isDate(date)) {
      throw new Error("自动删除日期不是一个有效的日期格式字符串");
    }

    this._autoRemoveDate = date;
  }
}

export class MenuTemplate {
  private _id: string;
  private _name: string;
  private _categories: Category[];
  private _items: MenuTemplateItem[];
  private _weight: number;

  constructor(name: string, categories: Category[], items: MenuTemplateItem[]) {
    if (!minLength(name, 2) || !maxLength(name, 10)) {
      throw new Error("菜单模版名字长度在2-10个字");
    }
    this._name = name;
    this._categories = categories;
    this._items = items;
    this._id = uuid();
    this._weight = 0;
  }

  get id() {
    return this._id;
  }

  canAddCategory(categoryId: number) {
    const errors: Error[] = [];
    if (!this._categories.find((category) => category.id === categoryId)) {
      errors.push(new Error("该分类已经加入模板"));
    }

    return errors;
  }

  /**
   * 添加分类
   * 添加分类前需要调用canAddCategory检查能否执行操作
   * 如果未检查就调用该方法，且canAddCategory返回非空的errors，将会抛出第一个Error
   * @param categoryId 分类ID
   */
  addCategory(categoryId: number) {
    const errors = this.canAddCategory(categoryId);
    if (errors.length > 0) throw errors[0];

    this._categories.push(new Category(categoryId, this._categories.length));
  }

  canAddItem(commodityId: string, categoryId: number) {
    const errors: Error[] = [];

    if (isEmpty(commodityId)) {
      errors.push(new Error("商品ID不能为空"));
    }
    if (isEmpty(categoryId)) {
      errors.push(new Error("类别ID不能为空"));
    }
    if (!this._categories.find((category) => category.id === categoryId)) {
      errors.push(new Error("不能在不存在的类别中添加商品"));
    }
    if (this._items.find((item) => item.commodityId === commodityId)) {
      errors.push(new Error("该商品已经添加到菜单模版中"));
    }

    return errors;
  }

  /**
   * 添加菜单项
   * 在添加菜单项之前需要调用canAddItem检查能否执行操作
   * 如果未检查就调用该方法，且canAddItem返回非空的errors，将会抛出第一个Error
   * @param commodityId 商品ID
   * @param categoryId 分类ID
   */
  addItem(commodityId: string, categoryId: number) {
    const errors = this.canAddItem(commodityId, categoryId);
    if (errors.length > 0) throw errors[0];

    this._items.push(new MenuTemplateItem(commodityId, categoryId, this._items.length));
  }

  findItem(commodityId: string): MenuTemplateItem | undefined {
    return this._items.find((commodity) => commodity.commodityId === commodityId);
  }
}

export interface MenuRepo {
  save(menu: MenuTemplate): void;
  findBy(id: string): Promise<MenuTemplate | undefined>;
}
