import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const NewsListPage = Loadable(lazy(() => import('./NewsListPage')));

const newsRoutes = [
    {
        path: '/news',
        element: <NewsListPage />,
        allowForRole: authRoles.all,
    },
];

export default newsRoutes;
