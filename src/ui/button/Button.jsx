import React from 'react';
const btn = ` rounded-full  
 text-sm font-semibold uppercase tracking-wide  
 transition-colors duration-300 
 focus:outline-none focus:ring  focus:ring-offset-2 disabled:cursor-not-allowed `;
export default function Button(props) {
  return (
    <button
      className={`${btn} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
