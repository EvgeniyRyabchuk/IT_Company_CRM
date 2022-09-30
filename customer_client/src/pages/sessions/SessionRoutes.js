import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import NotFound from "../NotFound";
// import EmailSentSuccessfully from "./EmailSentSuccessfully";
// import PasswordReset from "./PasswordReset";
//
// const NotFound = Loadable(lazy(() => import('../sessions/NotFound')));
// const ForgotPassword = Loadable(lazy(() => import('../sessions/ForgotPassword')));
// const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
// const JwtRegister = Loadable(lazy(() => import('../sessions/JwtRegister')));

const sessionRoutes = [
  // { path: '/session/signup', element: <JwtRegister /> },
  // { path: '/session/signin', element: <JwtLogin /> },
  // { path: '/session/forgot-password', element: <ForgotPassword /> },
  // { path: '/session/forgot-password/sent', element: <EmailSentSuccessfully /> },
  // { path: '/session/password-reset/:id/:token', element: <PasswordReset /> },
  //
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
