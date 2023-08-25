import { API_URL } from '../utils/helper';
import axios from 'axios';
import { faker } from '@faker-js/faker';

export const getMenu = async (query = 'pasta') => {
  if (query === '') return;
  try {
    const { data } = await axios.get(
      `${API_URL}?search=${query}&key=ff217a7a-3414-40c7-af03-efae6574b82a
    `
    );

    const menu = data.data.recipes.slice(0, 5).map((item) => {
      const price = faker.number.int({ min: 10, max: 100 });
      const quantity = 1;
      const totalPrice = price;
      return { ...item, price, quantity, totalPrice };
    });
    return { menu, query };
  } catch (error) {
    console.log(error);
  }
};

export const getIngredientsInfo = async (id) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/${id}?key=ff217a7a-3414-40c7-af03-efae6574b82a`
    );
    const { recipe } = data.data;
    if (recipe.price) {
      return recipe;
    } else {
      const price =
        Math.floor(Math.random() * recipe.cooking_time) + recipe.servings;
      const quantity = 1;
      const totalPrice = price;

      const newRecipe = {
        ...recipe,
        price,
        quantity,
        totalPrice,
      };

      return newRecipe;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const createNewOrder = async (data) => {
  const ingredients = Object.entries(data)
    .filter((item) => item[0].startsWith('ingredient-') && item[1] != '')
    .map((recipe, i) => {
      const ingArr = recipe[1].split(',').map((el) => el.trim());
      if (ingArr.length !== 3) throw Error('Enter a valid ingredients format');
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null,
        unit: unit ?? '',
        description: description ?? '',
      };
    });

  const order = {
    title: data.title,
    source_url: data.sourceUrl,
    servings: +data.servings,
    publisher: data.publisher,
    ingredients,
    image_url: data.image,
    cooking_time: +data.cookingTime,
  };
  try {
    const {
      data: { data },
    } = await axios.post(
      `${API_URL}?key=ff217a7a-3414-40c7-af03-efae6574b82a`,
      order
    );
    const { recipe } = data;
    return recipe;
  } catch (error) {
    console.log(error);
  }
};
