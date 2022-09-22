import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const SettingPage = Loadable(lazy(() => import('./SettingPage')));

const projectRoutes = [
    {
        path: '/setting',
        element: <SettingPage />,
        allowForRole: authRoles.all,
    },

];

export default projectRoutes;
