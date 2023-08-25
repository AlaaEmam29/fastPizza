import React from 'react';
const classes = 'rounded-full focus:outline-none focus:ring px-4 py-2 text-sm';

const Input = (props) => {
  return (
    <input
      className={`${classes} ${props.classes || ''}`}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      onKeyPress={props.onKeyPress}
    />
  );
};
export default Input;
