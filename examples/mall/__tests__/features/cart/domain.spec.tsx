import { renderHook, act } from "@testing-library/react";
import { createItem, IItem, useCart } from "@/features/cart";
import { mockProduct } from "../../mocks";

describe(">>> Cart domain", () => {
  const product = mockProduct();
  let item: IItem;
  beforeEach(() => {
    item = createItem(product, "S");
  });

  describe("initial state", () => {
    it("应该正确的初始化状态", () => {
      // When
      const { result } = renderHook(useCart);

      // Then
      expect(result.current.isEmpty).toBeTruthy();
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe("add method", () => {
    it("应该正确的添加商品到空的购物车", () => {
      // Given
      const { result } = renderHook(useCart);

      // When
      act(() => result.current.add(item));

      // Then
      expect(result.current.isEmpty).toBeFalsy();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].count).toBe(1);
    });

    it("如果添加的商品已经存在，购物项的数量应该正确的+1", () => {
      // Given
      const { result } = renderHook(useCart);
      act(() => result.current.add(item));

      // When
      act(() => result.current.add(item));

      // Then
      expect(result.current.isEmpty).toBeFalsy();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].count).toBe(2);
    });
  });

  describe("item factory", () => {
    it("应该正确的使用商品创建购物项", () => {
      const pickedSize = "M";
      // When
      const item = createItem(product, pickedSize);

      // Then
      expect(item.key).toBe(`${product.id}-${pickedSize}`);
      expect(item.count).toBe(1);
      expect(item.id).toBe(product.id);
      expect(item.name).toBe(product.name);
      expect(item.price).toBe(product.price);
      expect(item.size).toBe(pickedSize);
      expect(item.cover).toBe(product.cover);
    });
  });
});
