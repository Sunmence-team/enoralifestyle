import React from "react";
import { formatterUtility } from "../../utilities/formatterutility";
import { IoMdTrash } from "react-icons/io";
import { useCartStore } from "../../store/cartStore";

interface cartItemProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity?: number;
}

const CartCard = (cartItem: cartItemProps) => {
  const { removeFromCart } = useCartStore();

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(cartItem.id);
  };

  return (
    <div className="flex items-center md:gap-4 gap-2 justify-between border border-black/10 p-2 w-full rounded-md">
      <div className="w-16 h-16 rounded-[inherit] overflow-hidden border border-black/20">
        <img
          src={cartItem.image}
          alt={cartItem.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start text-start md:w-[calc(100%-90px)] w-[calc(100%-72px)]">
        <h3 className="line-clamp-1">
          {cartItem.title} <span className="text-(--primary-color) font-[Raleway]! font-bold! text-lg">x {cartItem.quantity}</span>
        </h3>
        <h3 className="md:hidden inline-flex">
          {formatterUtility(Number(cartItem.quantity ? (cartItem.price * cartItem.quantity) : cartItem.price))}
        </h3>
      </div>
      <h3 className="md:inline-flex hidden">
        {formatterUtility(Number(cartItem.quantity ? (cartItem.price * cartItem.quantity) : cartItem.price))}
      </h3>
      <button
        type="button"
        className="text-red-600 cursor-pointer text-xl"
        onClick={handleRemoveFromCart}
      >
        <IoMdTrash />
      </button>
    </div>
  );
};

export default CartCard;
