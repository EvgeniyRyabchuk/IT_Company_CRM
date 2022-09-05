import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const ProjectsListPage = Loadable(lazy(() => import('./OrderListPage')));
const OrdersPage = Loadable(lazy(() => import('./OrderPage')));

const ordersRoutes = [
    {
        path: '/orders',
        element: <ProjectsListPage />,
        allowForRole: authRoles.all,
    },
    {
        path: '/orders/:orderId',
        element: <OrdersPage />,
        allowForRole: authRoles.all,
    },
];

export default ordersRoutes;
