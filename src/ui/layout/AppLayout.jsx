import React from 'react';
import Header from '../header/Header';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Loading from '../loader/Loading';
import Footer from '../footer/Footer';
import { useSelector } from 'react-redux';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { isOpen } = useSelector((state) => state.cart);
  return (
    <div>
      <Header />
      {isLoading && <Loading />}
      <main className="my-8  flex items-center   justify-center">
        <Outlet />
      </main>
      {isOpen && <Footer />}
    </div>
  );
}
