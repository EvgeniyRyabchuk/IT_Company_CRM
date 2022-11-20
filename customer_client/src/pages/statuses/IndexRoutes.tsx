import Loadable from '../../components/Loadable';
import { lazy } from 'react';


const SuccessPaidPage = Loadable(lazy(() => import('./payment/SuccessPaid')));

const statusesRoutes = [
    {
        path: '/messages/statuses/payment-success',
        element: <SuccessPaidPage />,
    },
];

export default statusesRoutes;
