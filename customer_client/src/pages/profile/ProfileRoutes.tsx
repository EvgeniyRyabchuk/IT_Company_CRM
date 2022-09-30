import Loadable from '../../components/Loadable';
import { lazy } from 'react';


const ProfilePage = Loadable(lazy(() => import('./ProfilePage')));

const profileRoutes = [
    {
        path: '/profile',
        element: <ProfilePage />,
    },
];

export default profileRoutes;
