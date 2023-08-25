import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import ButtonLink from '../button/ButtonLink';
// million-ignore

export default function Error() {
  const error = useRouteError();
  const notFound = error?.statusText === 'Not Found';
  return (
    <div className="my-8 text-2xl">
      <h1 className="mb-2 text-center font-bold uppercase italic tracking-widest ">
        Something went Wrong
      </h1>
      <p className="text-center italic">
        {error.message ? error.message : error.data}
      </p>
      {notFound && <ButtonLink to="/"> Go back</ButtonLink>}
    </div>
  );
}
