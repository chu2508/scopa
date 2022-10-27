import { IProduct } from "@/features/cart";

export const mockProduct = (): IProduct => {
  return { id: 1, name: "Test Product", cover: "http://a.jpg", price: 1, size: ["M", "S"], description: "test content description" };
};
