import { IProduct } from "@/features/cart";
import classNames from "classnames";
import { FC, memo, ReactNode } from "react";

type FCWithProduct = FC<{
  product: IProduct;
}>;

export const ProductAlbum: FCWithProduct = ({ product }) => {
  return (
    <div aria-label='ProductAlbum'>
      <img aria-label='ProductCover' src={product.cover} />
    </div>
  );
};

export const ProductSpecification: FC<{ product: IProduct; value?: string; onItemClick?: (value: string, index: number) => void }> = (props) => {
  const { product, onItemClick, value } = props;
  return (
    <div aria-label='ProductSpecification'>
      <div aria-label='SpecName'>
        SIZE<span className='text-red-500'>*</span>
        <span aria-label='SpecPicked'>{value}</span>
      </div>
      {product.size.map((spec, index) => (
        <div key={index} aria-label='SpecValue' className={classNames({ "border-primary": spec === value })} onClick={() => onItemClick?.(spec, index)}>
          {spec}
        </div>
      ))}
    </div>
  );
};

export const ProductDetail: FCWithProduct = ({ product }) => {
  return (
    <div aria-label='ProductDetail'>
      <h3 aria-label='ProductName'>{product.name}</h3>
      <p aria-label='ProductPrice'>{formatMoney(product.price)}</p>
      <p aria-label='ProductDescription'>{product.description}</p>
    </div>
  );
};

export const Shopwindow: FCWithProduct = memo((props) => {
  return (
    <div>
      <ProductAlbum {...props} />
      <ProductDetail {...props} />
      <ProductSpecification {...props} />
      <button>ADD TO CART</button>
    </div>
  );
});

function formatMoney(price: number): string {
  return ` $${price.toFixed(2)}`;
}
