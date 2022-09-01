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
        path: '/projects/:projectId',
        element: <ProjectPage />,
        allowForRole: authRoles.all,
    },
    {
        path: '/projects/:projectId/?tab=kanban',
        element: <ProjectPage />,
        allowForRole: authRoles.all,
    },
    {
        path: '/projects/:projectId/?tab=members',
        element: <ProjectPage />,
        allowForRole: authRoles.all,
    },
    {
        path: '/projects/:projectId/?tab=filemanager',
        element: <ProjectPage />,
        allowForRole: authRoles.all,
    },
    {
        path: '/projects/:projectId/?tab=history',
        element: <ProjectPage />,
        allowForRole: authRoles.all,
    }
];

export default projectRoutes;
