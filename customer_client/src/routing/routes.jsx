import AuthGuard from '../auth/AuthGuard';
import sessionRoutes from '../pages/sessions/SessionRoutes';
import SuspenseLayout from '../components/layout/LayoutSuspence';
import NotFound from "../pages/NotFound";
import Loadable from "../components/Loadable";
import {lazy} from "react";
import profileRoutes from "../pages/profile/ProfileRoutes";
import indexRoutes from "../pages/index/IndexRoutes";

const childrenPublic = [
    ...indexRoutes,
    ...sessionRoutes,
    { path: '*', element: <NotFound /> },
];


const childrenPrivate = [
    ...profileRoutes

].map((e) => {
    e.element = (<AuthGuard>{e.element}</AuthGuard>)
    return e;
})


const routes = [
  {
    element: (<SuspenseLayout />),
    children: [
        ...childrenPublic,
        ...childrenPrivate
    ]
  },

];

export default routes;
