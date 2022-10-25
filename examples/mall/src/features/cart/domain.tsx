import { useCallback, useState } from "react";

/**
 * 商品类型定义
 */
export interface IProduct {
  id: number;
  name: string;
  cover: string;
  size: string;
}

/**
 * 购物项类型定义
 * key 商品id和size拼接成的唯一标识符
 * count 商品加购的数量
 */
interface IItem {
  key: string;
  name: string;
  cover: string;
  id: number;
  size: string;
  count: number;
}

export const useCart = () => {
  const [items, setItems] = useState<IItem[]>([]);

  const isEmpty = items.length === 0;

  const add = useCallback((product: IProduct) => {
    const key = `${product.id}-${product.size}`;

    setItems((arr) => {
      const index = arr.findIndex((item) => item.key === key);
      const item: IItem = index > -1 ? { ...arr[index], count: arr[index].count + 1 } : { key, ...product, count: 1 };

      // 将修改后的item赋值给原数据
      if (index > -1) {
        arr[index] = item;
      }
      return index > -1 ? [...arr] : [...arr, item];
    });
  }, []);

  return { items, isEmpty, add };
};
