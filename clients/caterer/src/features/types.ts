import { Location } from "@core/common";

export interface Shop {
  id: number;
  name: string;
  location: Location;
  businessDates: {
    days: number[];
    times: [string, string][];
  };
}

export interface Menu {
  id: number;
  shopId: number;
  categories: Category[];
  items: MenuItem[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface MenuItem {
  id: number;
  name: string;
  categoryId: number;
  mainPicture: string;
}
