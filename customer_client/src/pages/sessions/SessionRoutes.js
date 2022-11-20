import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";


const sessionRoutes = [
  { path: '/session/signup', element: <Signup /> },
  { path: '/session/login', element: <Login /> },
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
