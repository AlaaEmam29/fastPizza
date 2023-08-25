/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { z } from 'zod';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customerInfo, fetchAddress } from '../user/userSlice';
import { getUserInfo } from '../../utils/helper';
import ButtonLink from '../../ui/button/ButtonLink';
import EmptyCart from '../cart/EmptyCart';
const input = `w-full placeholder:text-stone-400 py-2.5 focus:ring-yellow-500 focus:ring-opacity-50 placeholder:italic placeholder:uppercase`;

export default function OrderConfirm() {
  const customerData = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  useEffect(() => {
    if (customerData) {
      dispatch(customerInfo(customerData));
      navigate('/checkout');
    }
  }, [customerData]);
  const { firstName, address, position } = useSelector((state) => state.user);
  const name = firstName || getUserInfo?.firstName;
  const { cart } = useSelector((state) => state.cart);
  const handlePosition = async (e) => {
    e.preventDefault();
    dispatch(fetchAddress());
  };
  if (cart.length == 0) {
    return (
      <div>
        <ButtonLink
          to="/menu"
          className="italic tracking-widest no-underline hover:text-blue-700	"
        >
          &larr; Go To Menu
        </ButtonLink>
        <EmptyCart />
      </div>
    );
  }
  return (
    <>
      <div className="w-full md:w-[70%] lg:w-[45%]  px-4 py-6 ">
        <h2 className="mb-8 text-xl font-semibold">
          Ready to order? Let's go!
        </h2>
        <Form method="POST">
          <div className="mb-10 flex  justify-between gap-3 sm:flex-row sm:items-center">
            <label className="uppercase italic tracking-wider sm:basis-40">
              First Name
            </label>
            <div className="grow">
              <Input
                classes={input}
                type="text"
                name="customer"
                value={name}
                required
              />
            </div>
          </div>

          <div className="mb-10 flex  justify-between gap-2 sm:flex-row sm:items-center">
            <label className="uppercase italic tracking-wider sm:basis-40">
              Phone number
            </label>
            <div className="grow">
              <Input classes={input} type="tel" name="phone" required />
            </div>
          </div>

          <div className="mb-10 flex  justify-between gap-2 sm:flex-row sm:items-center">
            <label className="uppercase italic tracking-wider sm:basis-40">
              Address
            </label>
            <div className="relative grow">
              <Input
                classes={input}
                type="text"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="absolute  right-[3px] top-[3px] z-50 ">
                <Button
                  onClick={handlePosition}
                  className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm text-xs font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-5 md:py-2.5"
                >
                  Get position
                </Button>
              </span>
            </div>
          </div>
          <div className="mb-12">
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <Button
              disabled={isSubmitting}
              className="end bg-yellow-400 px-4 py-2 text-xs text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300 disabled:bg-stone-300 md:px-5 md:py-2.5"
            >
              {isSubmitting ? 'Placing order....' : 'order now'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
const phoneNumberSchema = z
  .string()
  .min(11, { message: 'Invalid phone number. Must be min 11 and max 14' })
  .max(14, { message: 'Invalid phone number. Must be min 11 and max 14' });

export async function action({ request }) {
  const formData = await request.formData();
  const customer = Object.fromEntries(formData);

  try {
    phoneNumberSchema.parse(customer.phone);
  } catch (error) {
    const msg = JSON.parse(error.message)[0].message;
    alert(msg);
    return null;
  }
  const requiredAllData = Object.values(customer).some((value) => value === '');
  if (requiredAllData) {
    alert('all felids are required');
    return null;
  }
  const order = {
    ...customer,
    cart: JSON.parse(customer.cart),
  };
  return order ? order : null;
}
