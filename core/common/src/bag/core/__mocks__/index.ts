import { Grid } from "../grid";

export const mockGrid = (width = 3, height = 3) => {
  const grid = new Grid(width, height);

  return { grid, width, height };
};
