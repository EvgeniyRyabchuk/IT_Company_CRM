import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
// import EmailSentSuccessfully from "./EmailSentSuccessfully";
// import PasswordReset from "./PasswordReset";
//
// const NotFound = Loadable(lazy(() => import('../sessions/NotFound')));
// const ForgotPassword = Loadable(lazy(() => import('../sessions/ForgotPassword')));
// const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
// const JwtRegister = Loadable(lazy(() => import('../sessions/JwtRegister')));

const sessionRoutes = [
  { path: '/session/signup', element: <Signup /> },
  { path: '/session/login', element: <Login /> },
  // { path: '/session/forgot-password', element: <ForgotPassword /> },
  // { path: '/session/forgot-password/sent', element: <EmailSentSuccessfully /> },
  // { path: '/session/password-reset/:id/:token', element: <PasswordReset /> },

  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
