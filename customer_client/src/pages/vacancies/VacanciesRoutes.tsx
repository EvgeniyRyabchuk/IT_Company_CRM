import Loadable from '../../components/Loadable';
import { lazy } from 'react';


const VacanciesPage = Loadable(lazy(() => import('./VacanciesPage')));

const indexRoutes = [
    {
        path: '/vacancies',
        element: <VacanciesPage />,
    },
];

export default indexRoutes;
