import React from 'react';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import ButtonLink from '../../ui/button/ButtonLink';
import { Form, redirect } from 'react-router-dom';
import { createNewOrder } from '../../services/apiMenu';
const input = `placeholder:text-stone-400 w-[75%]  focus:ring-yellow-500 focus:ring-opacity-50 placeholder:italic placeholder:uppercase`;
export default function CreateOrder() {
  return (
    <>
      <div className="absolute left-[1%] top-[10%]">
        <ButtonLink className="text-2xl" to="/">
          {' '}
        </ButtonLink>
      </div>
      <div className=" w-[70%]">
        <h3 className="mb-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
          Personalize your order today!🌟🛒
        </h3>

        <Form method="POST">
          <div className="grid  grid-cols-2 gap-x-8 p-6">
            <div className="flex flex-col items-start   gap-x-4 gap-y-6 [&>*]:w-full  ">
              <div className="flex justify-between">
                <label htmlFor="" className="italic">
                  Title
                </label>
                <Input type="text" classes={input} name="title" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="italic">
                  URL
                </label>
                <Input type="url" classes={input} name="sourceUrl" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="italic">
                  Image URL
                </label>
                <Input type="url" classes={input} name="image" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="italic">
                  Publisher
                </label>
                <Input type="text" classes={input} name="publisher" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="italic">
                  Prep time
                </label>
                <Input type="number" classes={input} name="cookingTime" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="italic">
                  Servings
                </label>
                <Input type="number" classes={input} name="servings" />
              </div>
            </div>
            <div className="flex flex-col items-start   gap-x-4 gap-y-6  [&>*]:w-full ">
              {Array.from({ length: 6 }, (_, i) => {
                return (
                  <div key={i} className="flex justify-between">
                    <label htmlFor="" className="italic">
                      Ingredient {i + 1}
                    </label>
                    <Input
                      type="text"
                      classes={input}
                      name={`ingredient-${i + 1}`}
                      value="0.5,kg,Rice"
                      placeholder="Format: 'Quantity,Unit,Description'"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <Button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              order
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const order = Object.fromEntries(formData);
  const data = await createNewOrder(order);
  return redirect(`/order/${data.id}`);
}
