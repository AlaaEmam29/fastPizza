import React from 'react';
import { getUserInfo } from '../../utils/helper';
import { useSelector } from 'react-redux';

export default function User() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {(user || getUserInfo) && (
        <h2 className="text-sm font-semibold md:block">
          {user.firstName || getUserInfo.firstName}{' '}
          {user.lastName || getUserInfo.lastName}
        </h2>
      )}
    </>
  );
}
