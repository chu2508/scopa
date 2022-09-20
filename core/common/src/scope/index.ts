import { arrayMinSize } from "class-validator";
export enum ServiceScopeTypes {
  ALL = "ALL",
  WHITELIST = "WHITELIST",
  BLACKLIST = "BLACKLIST",
}

export class ServiceScope {
  private _type: ServiceScopeTypes;
  private _shops: string[];

  constructor(type: ServiceScopeTypes, shops: string[]) {
    if (type !== ServiceScopeTypes.ALL && arrayMinSize(shops, 1)) {
      throw new Error("至少需要1个门店ID");
    }
    this._type = type;
    this._shops = shops;
  }
}
