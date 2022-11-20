import { authRoles } from '../../auth/authRoles';
import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const AppEchart = Loadable(lazy(() => import('./echarts/AppEchart')));

const statisticRoute = [{ path: '/statistic', element: <AppEchart />, auth: authRoles.editor }];

export default statisticRoute;
