import React from 'react';
import { Link } from 'react-router-dom';
import User from '../../features/user/User';
import SearchInput from '../input/SearchInput';

export default function Header() {
  return (
    <header className=" flex 	 items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="text-xl md:text-2xl lg:text-3xl tracking-widest">
        fast food co.
      </Link>
      <SearchInput />
      <User />
    </header>
  );
}
