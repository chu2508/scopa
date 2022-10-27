import { ProductAlbum, ProductDetail, ProductSpecification, Shopwindow } from "@/presentations/views/shopwindows";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import { mockProduct } from "../../../mocks";

describe(">>> Shopwindow view", () => {
  const product = mockProduct();

  it("商品应该被正确的渲染", async () => {
    const { findByLabelText, getByRole } = render(<Shopwindow product={product} />);

    expect(await findByLabelText("ProductDetail")).not.toBeNull();
    expect(await findByLabelText("ProductAlbum")).not.toBeNull();
    expect(await findByLabelText("ProductSpecification")).not.toBeNull();
    expect(getByRole("button")).toHaveTextContent("ADD TO CART");
  });

  describe(">>> ProductAlbum", () => {
    it("应该正确的渲染商品图片", () => {
      const { getByLabelText } = render(<ProductAlbum product={product} />);

      expect(getByLabelText("ProductCover")).toHaveAttribute("src", product.cover);
    });
  });

  describe(">>> ProductDetail", () => {
    it("应该正确的渲染商品详情", () => {
      const { getByLabelText } = render(<ProductDetail product={product} />);

      expect(getByLabelText("ProductName")).toHaveTextContent(product.name);
      expect(getByLabelText("ProductPrice")).toHaveTextContent("$1.00");
      expect(getByLabelText("ProductDescription")).toHaveTextContent(product.description);
    });
  });

  describe(">>> ProductSpecification", () => {
    it("应该正确的渲染size", () => {
      const { getByLabelText, getAllByLabelText } = render(<ProductSpecification product={product} />);

      expect(getByLabelText("SpecName")).toHaveTextContent("SIZE");
      expect(getByLabelText("SpecPicked")).not.toHaveTextContent("S");
      expect(getAllByLabelText("SpecValue")).toHaveLength(product.size.length);
    });

    it("应该正确的响应对item的点击", () => {
      const onItemClick = jest.fn();
      const { getAllByLabelText } = render(<ProductSpecification product={product} onItemClick={onItemClick} />);

      fireEvent.click(getAllByLabelText("SpecValue")[0]);

      expect(onItemClick).toBeCalledTimes(1);
      expect(onItemClick).toBeCalledWith(product.size[0], 0);
    });

    it("应该正确的显示item为选中状态", () => {
      const pickedValue = "S";
      const borderColor = "border-primary";

      const { getByLabelText, getAllByLabelText } = render(<ProductSpecification product={product} value={pickedValue} />);

      expect(getByLabelText("SpecPicked")).toHaveTextContent(pickedValue);
      expect(getAllByLabelText("SpecValue")[0]).not.toHaveClass(borderColor);
      expect(getAllByLabelText("SpecValue")[1]).toHaveClass("border-primary");
    });
  });
});
