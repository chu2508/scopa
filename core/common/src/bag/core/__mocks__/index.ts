import { Bag, IArticle, PlacingAngle } from "../bag";
import { Grid } from "../grid";

export const mockGrid = (width = 3, height = 3) => {
  const grid = new Grid(width, height);

  return { grid, width, height };
};

export const mockArticle = (id = 1, width = 2, height = 2, angle = PlacingAngle.Zero): IArticle => {
  return {
    id,
    width,
    height,
    angle,
  };
};

export const mockBag = (width = 10, height = 10) => {
  return { width, height, bag: new Bag(width, height) };
};
