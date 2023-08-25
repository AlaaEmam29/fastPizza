import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonLink(props) {
  return (
    <Link
      to={props.to}
      className={`block  p-2 text-center text-blue-500 underline ${props.className}`}
    >
      {props.children}
    </Link>
  );
}
