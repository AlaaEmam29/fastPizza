import React, { useEffect, useState } from 'react';
import { getIngredientsInfo } from '../../services/apiMenu';

export default function IngredientsInfo({ id, title, price }) {
  const [ingredients, setIngredients] = useState();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getIngredient = async () => {
      try {
        const data = await getIngredientsInfo(id);
        const ings = data.ingredients
          .map((item) => item.description)
          .join(', ');
        setIngredients(ings);
      } catch (error) {
        console.log(error);
      }
    };
    getIngredient();
  }, [id]);
  const handleClick = (e) => {
    e.preventDefault();
    setShowMore((state) => !state);
  };
  return (
    <>
      {ingredients ? (
        <div className="ml-4 flex flex-col gap-2 ">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm capitalize italic text-stone-500   ">
            {showMore ? ingredients : <>{`${ingredients.slice(0, 50)} `}</>}

            <span
              onClick={handleClick}
              className="text-md cursor-pointer text-blue-500"
            >
              {showMore ? 'show less' : 'show more...'}
            </span>
          </p>
          <p className="mt-4 text-sm font-bold">€ {price}</p>
        </div>
      ) : (
        <p className="text-sm capitalize italic text-stone-500">Loading...</p>
      )}
    </>
  );
}
