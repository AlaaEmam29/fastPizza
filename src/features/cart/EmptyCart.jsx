import React from 'react';

export default function EmptyCart() {
  return (
    <div className="mt-10">
      <h2 className="mt-3 text-2xl font-semibold text-gray-600">
        Your cart is currently empty.
      </h2>
      <p className="mt-2 text-gray-500">
        Start adding some orders to fill it up! 😊
      </p>
    </div>
  );
}
