import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate } from '../../utils/helper';
import Button from '../../ui/button/Button';
import { useFetcher, useNavigate } from 'react-router-dom';
import { clearCart } from '../cart/cartSlice';
const btn = `inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase 
tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 
focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300
 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4`;
export default function Checkout() {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { query } = useSelector((state) => state.menu.menu);
  const tips = Math.floor(Math.random() * 10) + 1;

  const totalTime = Math.floor(totalPrice / cart.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleConfirmOrder = () => {
    navigate('/menu');
    dispatch(clearCart());
  };
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order status</h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">Only {totalTime} minutes left 😃</p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formattedDate})
        </p>
      </div>
      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item, i) => {
          return (
            <>
              <li key={i} className="space-y-1 py-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <img src={item.image_url} className="h-12" alt={item.title} />
                  <p>
                    <span className="font-bold">{item.quantity}×</span>{' '}
                    {item.title}
                  </p>
                  <p className="font-bold">€ {item.totalPrice}</p>
                </div>
              </li>
            </>
          );
        })}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price {query}: €{totalPrice}
        </p>
        <p className="font-bold">To pay on delivery: € {totalPrice + tips}</p>
      </div>
      <div className=" mb-16 py-3 text-end">
        <Button className={btn} onClick={handleConfirmOrder}>
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
