import Loadable from '../../components/Loadable';
import { lazy } from 'react';


const OrderPage = Loadable(lazy(() => import('./OrderPage')));

const orderRoutes = [
    {
        path: '/orders/:orderId',
        element: <OrderPage />,
    },
];

export default orderRoutes;
