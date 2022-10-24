import { Bag, IArticle, PlacingAngle } from "./bag";
import { mockArticle, mockBag, mockGrid } from "./__mocks__/index";

describe(">>> Bag", () => {
  describe("Bag instantiation", () => {
    it("bag should be correctly instanced whit params", () => {
      const width = 10,
        height = 10;

      const bag = new Bag(width, height);

      expect(bag.width).toBe(width);
      expect(bag.height).toBe(height);
      expect(bag.area).toBe(width * height);
      expect(bag.grid).not.toBeNull();
    });
  });

  describe("Bag methods", () => {
    it("article should be correctly add  in bag when `put` called", () => {
      const { bag } = mockBag(3, 3);

      const article1 = mockArticle();
      const article2 = mockArticle(2, 1, 1);
      const article3 = mockArticle(3);

      let result = bag.put(article1);

      expect(result).toBeTruthy();
      expect(bag.grid.get(0, 0)).toBe(article1.id);
      expect(bag.grid.get(0, 1)).toBe(article1.id);
      expect(bag.grid.get(1, 0)).toBe(article1.id);
      expect(bag.grid.get(1, 1)).toBe(article1.id);

      result = bag.put(article2);

      expect(result).toBeTruthy();
      expect(bag.grid.get(2, 0)).toBe(article2.id);

      // 背包没有空间放置这个物品
      result = bag.put(article3);

      expect(result).toBeFalsy();
    });

    it("article should be correctly removed  from bag when `take` called", () => {
      const { bag } = mockBag(3, 3);
      const article = mockArticle();

      bag.put(article);

      expect(bag.free).toBe(5);

      bag.take(article);

      expect(bag.free).toBe(9);
    });
  });
});
