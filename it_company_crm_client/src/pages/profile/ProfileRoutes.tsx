import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const ProfilePage = Loadable(lazy(() => import('./ProfilePage')));

const projectRoutes = [
    {
        path: '/profile',
        element: <ProfilePage />,
        allowForRole: authRoles.all,
    },

];

export default projectRoutes;
