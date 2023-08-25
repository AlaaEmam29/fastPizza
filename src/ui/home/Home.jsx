import React, { useEffect } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, onChangeInput } from '../../features/user/userSlice';
const input = `mb-8 w-65 placeholder:text-stone-400  focus:ring-yellow-500 focus:ring-opacity-50 placeholder:italic placeholder:uppercase`;
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/helper';
const btnStyle =
'bg-yellow-400 px-4 py-3 text-stone-800 hover:bg-yellow-300  focus:bg-yellow-300 focus:ring-yellow-300 disabled:bg-stone-300 md:px-6 md:py-4';
// million-ignore
export default function Home() {
  const user = useSelector((state) => state.user);
  const { username, firstName, lastName, email } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    dispatch(onChangeInput({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser());
    navigate('menu');
  };
  const handleContinue = () => {
    navigate('menu');
  };
  const isBtnDisabled = !username || !firstName || !lastName || !email;
  return (
    <div className="align-center flex flex-col [&>*]:text-center ">
      <h1 className="mb-4  text-xl font-semibold uppercase tracking-widest md:text-4xl ">
        The best Food.
      </h1>
      <h2 className="text-3xl tracking-wider text-yellow-500">
        Order Happiness
        <br />
        <span className="relative left-20 block py-3 text-2xl">
          One Bite at a Time
        </span>
      </h2>
      <p className="mb-8 mt-4 text-lg tracking-wider text-stone-950">
        👋 Welcome! Please start by telling us your name:
      </p>
      {!getUserInfo?.firstName ? (
        <form className="grid grid-cols-2 gap-x-4 " onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="first name"
            classes={input}
            name="firstName"
            value={firstName}
            onChange={(e) => handleOnChange(e)}
          />
          <Input
            type="text"
            placeholder="last name"
            classes={input}
            name="lastName"
            value={lastName}
            onChange={(e) => handleOnChange(e)}
          />
          <Input
            type="text"
            placeholder="user name"
            classes={`${input} col-span-full	`}
            name="username"
            value={username}
            onChange={(e) => handleOnChange(e)}
          />
          <Input
            type="email"
            placeholder="email"
            classes={`${input} col-span-full	`}
            name="email"
            value={email}
            onChange={(e) => handleOnChange(e)}
          />
          <div className=" col-span-full">
            <Button disabled={isBtnDisabled} className={btnStyle}>
              start ordering
            </Button>
          </div>
        </form>
      ) : (
        <Button onClick={handleContinue} className={`${btnStyle} m-auto w-fit`}>
          continue ordering {getUserInfo?.firstName}
        </Button>
      )}
    </div>
  );
}
