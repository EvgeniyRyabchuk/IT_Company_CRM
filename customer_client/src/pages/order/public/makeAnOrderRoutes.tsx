import Loadable from '../../../components/Loadable';
import { lazy } from 'react';


const MakeAnOrderPage = Loadable(lazy(() => import('./MakeAnOrderPage')));

const makeAnOrderRoutes = [
    {
        path: '/make-an-order',
        element: <MakeAnOrderPage />,
    },
];

export default makeAnOrderRoutes;
