import { createBrowserRouter } from 'react-router-dom';
import Home from './ui/home/Home';
import Menu, { Loader as menuLoader } from './features/menu/Menu';
import Order, { Loader as loaderOrder } from './features/order/Order';
import User from './features/user/User';
import Checkout from './features/checkout/Checkout';
import Cart from './features/cart/Cart';
import AppLayout from './ui/layout/AppLayout';
import Error from './ui/error/Error';
import CreateOrder, {
  action as createAction,
} from './features/order/CreateOrder';
import OrderConfirm, {
  action as confirmOrderAction,
} from './features/order/OrderConfirm';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: 'order/:orderId',
        loader: loaderOrder,
        element: <Order />,
      },
      {
        path: 'order/new',
        element: <CreateOrder />,
        action: createAction,
      },
      {
        path: 'order/confirm',
        element: <OrderConfirm />,
        action: confirmOrderAction,
      },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

export default router;
