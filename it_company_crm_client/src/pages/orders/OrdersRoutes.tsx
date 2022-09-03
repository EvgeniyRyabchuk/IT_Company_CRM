import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const OrdersPage = Loadable(lazy(() => import('./OrderListPage')));

const ordersRoutes = [
    {
        path: '/orders',
        element: <OrdersPage />,
        allowForRole: authRoles.all,
    },
];

export default ordersRoutes;
