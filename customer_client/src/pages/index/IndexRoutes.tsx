import Loadable from '../../components/Loadable';
import { lazy } from 'react';


const IndexPage = Loadable(lazy(() => import('./IndexPage')));

const indexRoutes = [
    {
        path: '/',
        element: <IndexPage />,
    },
];

export default indexRoutes;
