import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const ProjectsPage = Loadable(lazy(() => import('./ProjectsListPage')));
const ProjectPage = Loadable(lazy(() => import('./ProjectPage')));

const projectRoutes = [
    {
        path: '/projects',
        element: <ProjectsPage />,
        allowForRole: authRoles.all,
    },
    {
        path: '/projects/1',
        element: <ProjectPage />,
        allowForRole: authRoles.all,
    }
];

export default projectRoutes;
