import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { query } = useSelector((state) => state.menu?.menu);
  const { totalPrice, totalOrder, cart } = useSelector((state) => state.cart);
  if (cart.length === 0) return null;
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalOrder} {query}
        </span>
        <span>€{totalPrice}</span>
      </p>

      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
