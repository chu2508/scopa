import { useCallback, useState } from "react";

/**
 * 商品类型定义
 */
export interface IProduct {
  id: number;
  name: string;
  cover: string;
  description: string;
  size: string[];
  price: number;
}

/**
 * 购物项类型定义
 * key 商品id和size拼接成的唯一标识符
 * count 商品加购的数量
 */
export interface IItem {
  key: string;
  name: string;
  cover: string;
  id: number;
  size: string;
  count: number;
  price: number;
}

export const useCart = () => {
  const [items, setItems] = useState<IItem[]>([]);

  const isEmpty = items.length === 0;

  const add = useCallback((newItem: IItem) => {
    setItems((arr) => {
      const index = arr.findIndex((item) => item.key === newItem.key);
      const oldItem = arr[index];
      const actualItem = index > -1 ? { ...oldItem, count: oldItem.count + 1 } : newItem;

      // 将修改后的item赋值给原数据
      if (index > -1) {
        arr[index] = actualItem;
      }
      return index > -1 ? [...arr] : [...arr, actualItem];
    });
  }, []);

  return { items, isEmpty, add };
};

export const createItem = (product: IProduct, pickedSize: string): IItem => {
  const key = `${product.id}-${pickedSize}`;
  const { size, ...rest } = product;
  return { key, ...rest, size: pickedSize, count: 1 };
};

export const useProduct = () => {
  const product: IProduct = {
    id: 1,
    name: "Classics tee",
    cover: "add",
    size: ["S", "M", "L"],
    price: 7.99,
    description: "description test word",
  };

  return product;
};
