import AuthGuard from '../auth/AuthGuard';
import sessionRoutes from '../pages/sessions/SessionRoutes';
import SuspenseLayout from '../components/layout/LayoutSuspence';
import NotFound from "../pages/sessions/NotFound";
import profileRoutes from "../pages/profile/ProfileRoutes";
import indexRoutes from "../pages/index/IndexRoutes";
import ContactUs from "../pages/ContactUs";
import ThreeColContactDetails from "../components/cards/ThreeColContactDetails";
import orderRoutes from "../pages/order/OrderRoutes";

const childrenPublic = [
    ...indexRoutes,
    ...sessionRoutes,
    { path: 'contact-us', element: <ContactUs /> },

    { path: '*', element: <NotFound /> },
];


const childrenPrivate = [
    ...profileRoutes,
    ...orderRoutes

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
