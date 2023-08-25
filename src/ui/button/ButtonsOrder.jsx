import React from 'react';
import Button from './Button';
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
const btn =
  'bg-yellow-400  text-stone-800 hover:bg-yellow-300  focus:bg-yellow-300 focus:ring-yellow-300 disabled:bg-stone-300 px-2.5 py-1 md:px-3.5 md:py-2 text-sm';

export default function ButtonsOrder({ quantity, id }) {
  const dispatch = useDispatch();
  const handleIncreaseItemQuantity = (e, id) => {
    e.preventDefault();
    dispatch(increaseItemQuantity(id));
  };

  const handleDecreaseItemQuantity = (e, id) => {
    e.preventDefault();
    dispatch(decreaseItemQuantity(id));
  };
  const handleDeleteFromCard = (e, id) => {
    e.preventDefault();
    dispatch(deleteItem(id));
  };

  return (
    <>
      <div className="flex items-center gap-4 md:gap-3">
        <Button
          onClick={(e) => handleDecreaseItemQuantity(e, id)}
          className={btn}
        >
          -
        </Button>
        <span className="text-sm font-medium">{quantity}</span>
        <Button
          onClick={(e) => handleIncreaseItemQuantity(e, id)}
          className={`${btn} mx-2`}
        >
          +
        </Button>
      </div>
      <Button onClick={(e) => handleDeleteFromCard(e, id)} className={btn}>
        Delete
      </Button>
    </>
  );
}
