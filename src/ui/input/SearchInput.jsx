import Input from '../input/Input';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../utils/helper';
import { useState } from 'react';
import { getMenu } from '../../services/apiMenu';
import { addMenuData } from '../../features/menu/menuSlice';
const classes = `w-28  bg-yellow-100 
transition-all duration-300 placeholder:text-stone-400 
focus:ring-yellow-500 
focus:ring-opacity-50 sm:w-64 sm:focus:w-72`;

export default function SearchInput() {
  const user = useSelector((state) => state.user);
  const isShow = user.firstName || getUserInfo.firstName ? 'block' : 'hidden';
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleKeyPress = async (event) => {
    const pressedKey = event.key;
    if (pressedKey === 'Enter') {
      const data = await getMenu(query);
      dispatch(addMenuData(data));
      setQuery('');
    }
  };

  return (
    <Input
      type="text"
      placeholder="search order # "
      classes={`${classes} ${isShow}`}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
}
