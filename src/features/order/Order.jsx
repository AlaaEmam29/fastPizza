import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { getIngredientsInfo } from '../../services/apiMenu';
import { Fraction } from 'fraction.js';
import Button from '../../ui/button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, isInCart } from '../cart/cartSlice';
const btn =
  'bg-green-500 hover:bg-green-500 focus:bg-green-500 focus:ring-green-500 ml-auto self-end px-4 py-2 text-xs md:px-5 md:py-2.5 disabled:bg-slate-300 text-slate-200';
const btnDelete =
  'bg-red-500 hover:bg-red-500 focus:bg-red-500 focus:ring-red-500 ml-auto self-end px-4 py-2 text-xs md:px-5 md:py-2.5 disabled:bg-slate-300 text-slate-200';
export default function Order() {
  const {
    menu: { menu },
  } = useSelector((state) => state.menu);
  const { cart } = useSelector((state) => state.cart);
  const order = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigate('/cart');
  };
  const handleCancel = (e, id) => {
    navigate(-1);
    dispatch(deleteItem(id));
  };
  const handleAddNewToCart = () => {
    navigate('/cart');

    dispatch(addItem(order));
  };

  return (
    <>
      {order && (
        <div className="">
          <img
            src={order.image_url}
            alt={order.title}
            className="fixed left-0 top-0	-z-50 h-full w-full opacity-50"
          />
          <div className=" scale-[0.95]">
            <h1 className="m-auto w-[60%] skew-x-[10deg] bg-gradient-to-r from-yellow-300 via-stone-800 to-green-500 bg-clip-text p-4 text-center text-5xl font-bold leading-tight text-transparent">
              {order.title}
            </h1>
            <div className="m-auto  flex w-fit flex-col gap-y-8 p-4 text-center">
              <h2 className="font-bold uppercase">order ingredients</h2>
              <ul className="grid list-none grid-cols-2 gap-x-8 gap-y-4 text-start">
                {order?.ingredients ? (
                  order?.ingredients?.map((ings, index) => (
                    <li key={index} className="flex items-center gap-x-2">
                      <input
                        checked={true}
                        id={`yellow-checkbox-${index}`}
                        type="checkbox"
                        value=""
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-yellow-400 focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-yellow-600"
                      />
                      <label
                        htmlFor={`yellow-checkbox-${index}`}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {ings.quantity ? (
                          <span className="uppercase italic">
                            {new Fraction(ings.quantity).toString()}
                          </span>
                        ) : (
                          ''
                        )}
                        <span className="mr-2 uppercase italic">
                          {ings.unit}
                        </span>

                        <span className="uppercase italic">
                          {ings.description}
                        </span>
                      </label>
                    </li>
                  ))
                ) : (
                  <span className="uppercase italic">Loading....</span>
                )}
              </ul>
            </div>
            <div className=" my-4 w-1/2  space-y-2 rounded bg-stone-200 px-6 py-5">
              <p className="text-sm font-medium text-stone-600">
                Cooking time: {order.cooking_time} minutes
              </p>
              <p className="text-sm font-medium text-stone-600">
                Price order: € {order.price}
              </p>
            </div>

            <div className=" mb-20 w-fit">
              {isInCart(cart, order.id) ? (
                <Button
                  className={`${btn} mx-20 bg-stone-300 `}
                  onClick={handleNavigate}
                >
                  Already Added, Go To Cart
                </Button>
              ) : (
                <Button className={`${btn} mx-20`} onClick={handleAddNewToCart}>
                  added into your Cart
                </Button>
              )}
              <Button
                className={btnDelete}
                onClick={(e) => handleCancel(e, order.id)}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export async function Loader({ params }) {
  const data = await getIngredientsInfo(params.orderId);
  return data ? data : null;
}
