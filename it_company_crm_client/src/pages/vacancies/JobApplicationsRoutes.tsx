import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const JobApplicationListPage = Loadable(lazy(() => import('./JobApplicationListPage')));

const jobApplicationsRoutes = [
    {
        path: '/job-applications',
        element: <JobApplicationListPage />,
        allowForRole: authRoles.all,
    },
];

export default jobApplicationsRoutes;
