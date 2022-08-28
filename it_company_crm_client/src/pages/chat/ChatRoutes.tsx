import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const Chat = Loadable(lazy(() => import('./ChatPage')));

const chatRoutes = [

    {
        path: '/chats',
        // render: (props) => <Analytics auth={authRoles.employee} {...props} />,
        element: <Chat />,
        allowForRole: authRoles.all
        // auth: authRoles.employee
        // component: (props) => <Analytics auth={authRoles.employee} {...props} />
        // element: (props) => <Analytics allowForRoles={authRoles.employee} {...props}/>,
    },
    {
        path: '/chats/:withUserId',
        // render: (props) => <Analytics auth={authRoles.employee} {...props} />,
        element: <Chat />,
        allowForRole: authRoles.all
        // auth: authRoles.employee
        // component: (props) => <Analytics auth={authRoles.employee} {...props} />
        // element: (props) => <Analytics allowForRoles={authRoles.employee} {...props}/>,
    },
];

export default chatRoutes;
