import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/features/cart";

describe(">>> Cart domain", () => {
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
    const product = { id: 1, size: "S", name: "Test Product", cover: "http://a.jpg" };

    it("应该正确的添加商品到空的购物车", () => {
      // Given
      const { result } = renderHook(useCart);

      // When
      act(() => result.current.add(product));

      // Then
      expect(result.current.isEmpty).toBeFalsy();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].count).toBe(1);
    });

    it("如果添加的商品已经存在，购物项的数量应该正确的+1", () => {
      // Given
      const { result } = renderHook(useCart);
      act(() => result.current.add(product));

      // When
      act(() => result.current.add(product));

      // Then
      expect(result.current.isEmpty).toBeFalsy();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].count).toBe(2);
    });
  });
});
