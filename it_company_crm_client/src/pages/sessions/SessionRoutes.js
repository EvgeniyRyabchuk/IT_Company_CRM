import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('../sessions/NotFound')));
const ForgotPassword = Loadable(lazy(() => import('../sessions/ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('../sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('../sessions/JwtRegister')));

const sessionRoutes = [
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
