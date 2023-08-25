import React, { useEffect } from 'react';
import ButtonLink from '../../ui/button/ButtonLink';
import { getUserInfo } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import ButtonsOrder from '../../ui/button/ButtonsOrder';
import {
  clearCart,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from './cartSlice';
import EmptyCart from './EmptyCart';
const btnWhite =
  'border-gray-300 hover:bg-gray-300 bg-gray-400 hover:text-slate-950 focus:bg-gray-300 focus:text-slate-900 text-slate-900';
const btnYellow =
  'text-stone-800 bg-yellow-400 hover:bg-yellow-300  focus:bg-yellow-300 focus:ring-yellow-300';
const btnStyle = ' px-4 py-3   disabled:bg-stone-300 md:px-6 md:py-4';

export default function Cart() {
  const { firstName } = useSelector((state) => state.user);
  const name = firstName || getUserInfo?.firstName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const handleCheckOut = () => {
    navigate('/order/confirm');
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex h-full w-[95%] md:w-[65%] lg:w-[55%] flex-col items-start gap-3  md:gap-2  ">
      <ButtonLink
        to="/menu"
        className="italic tracking-widest no-underline hover:text-blue-700	"
      >
        &larr; Go To Menu
      </ButtonLink>
      {cart.length > 0 ? (
        <>
          <h2 className="mt-7 text-2xl font-semibold ">
            Your cart, &nbsp;{name}
          </h2>
          <div className="mt-3 w-full divide-y divide-stone-200 border-b">
            {cart.map((item, index) => {
              return (
                <CartItem key={index}>
                  <div className="mb-2 flex items-center justify-between  gap-3 md:gap-2 lg:gap-1 p-3">
                    <img
                      src={item.image_url}
                      className=" h-10"
                      alt={item.title}
                    />
                    <p className="mb-1 sm:mb-0">
                      {item.quantity}× {item.title}
                    </p>
                    <div className="flex items-center justify-between sm:gap-6">
                      <p className="text-sm font-bold mx-4">€{item.totalPrice}</p>
                      <ButtonsOrder quantity={item.quantity} id={item.id} />
                    </div>
                  </div>
                </CartItem>
              );
            })}
          </div>
          <div className=" mb-16 mt-4">
            <Button
              className={`${btnStyle} ${btnYellow} mr-4`}
              onClick={handleCheckOut}
            >
              Go To checkout
            </Button>
            <Button
              onClick={handleClearCart}
              className={`${btnStyle} ${btnWhite}`}
            >
              Clear Cart
            </Button>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
