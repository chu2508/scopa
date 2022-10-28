import { IItem, useCart } from "@/features/cart";
import { useTrigger } from "@/tools";
import { FC } from "react";

const CartEmpty = () => {
  return <div>Cart is emptied</div>;
};

const CartItem: FC<{ item: IItem }> = ({ item }) => {
  return (
    <section>
      <img alt='ItemCover' src={item.cover} />
      <div>
        <div>
          {item.count} x ${item.price}
        </div>
        <div>
          {item.name} - {item.size}
        </div>
      </div>
    </section>
  );
};

export const CartOnNavbar = () => {
  const { items, isEmpty } = useCart();
  const { value: visible, trigger } = useTrigger();
  return (
    <div aria-label='CartOnNavbar'>
      <span aria-label='CartOnNavbarTrigger' onClick={trigger}>
        CART
      </span>
      <div aria-label='CartOnNavbarDropdown' style={{ display: visible ? "block" : "none" }}>
        {items.map((item) => (
          <CartItem key={item.key} item={item} />
        ))}
        {isEmpty && <CartEmpty />}
      </div>
    </div>
  );
};
