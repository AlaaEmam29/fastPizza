/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getMenu } from '../../services/apiMenu';
import { Link, useLoaderData } from 'react-router-dom';
import Button from '../../ui/button/Button';
import MenuItem from './MenuItem';
import IngredientsInfo from './IngredientsInfo';
import { useSelector, useDispatch } from 'react-redux';
import { addMenuData, updateMenuData } from './menuSlice';
import Loading from '../../ui/loader/Loading';
import ButtonsOrder from '../../ui/button/ButtonsOrder';
import { addItem, isInCart } from '../cart/cartSlice';
// million-ignore

export default function Menu() {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const { menu: menuData, query } = useSelector((state) => state.menu?.menu);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (data?.menu && !menuData) {
      dispatch(addMenuData(data));
    }
  }, [data?.menu, menuData]);


  const handleAddToCard = (e, index) => {
    e.preventDefault();
    const order = menuData[index];
    dispatch(addItem(order));
  };

  return (
    <div className="mb-16 w-full md:w-[70%] lg:w-[55%]   ">
      <Link
        to="/order/new"
        className="absolute right-5 top-[6%] md:top-[15%]  inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50"
      >
        Make Your Order
      </Link>
      <h3 className="mb-3  text-center font-medium uppercase italic tracking-widest">
        {menuData?.length} creative {query} dishes to choose from
      </h3>

      <div className="w-full">
        {menuData ? (
          <div className="menu-list flex  h-full flex-col items-center justify-center gap-4 divide-y  divide-stone-200 px-2 ">
            {menuData?.map((menu, index) => {
              const itemInCart = isInCart(cart, menu.id);
              const quantity = itemInCart ? itemInCart.quantity : 1;
              return (
                <MenuItem key={menu.id}>
                  <Link
                    to={`/order/${menu.id}`}
                    className="flex  items-center gap-4 py-2"
                  >
                    <img
                      src={menu.image_url}
                      alt={menu.title}
                      className="block h-[8rem] w-[8rem] rounded "
                    />
                    <IngredientsInfo
                      id={menu.id}
                      title={menu.title}
                      price={menu.price}
                    />
                    {itemInCart ? (
                      <ButtonsOrder quantity={quantity} id={menu.id} />
                    ) : (
                      <Button
                        className="ml-auto self-end bg-yellow-400 px-4 py-2 text-xs text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300 disabled:bg-stone-300 md:px-5 md:py-2.5"
                        onClick={(e) => handleAddToCard(e, index)}
                      >
                        add to cart
                      </Button>
                    )}
                  </Link>
                </MenuItem>
              );
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export async function Loader() {
  const menuList = await getMenu();
  return menuList?.menu?.length > 0 ? menuList : null;
}
