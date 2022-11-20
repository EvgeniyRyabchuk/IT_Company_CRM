import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";


const AuthGuard = ({ children, allowRoles }) => {
    let {
        isAuthenticated,
        user
    } = useAuth();

    const { pathname } = useLocation();

    // console.log('fetch role guard', allowRoles)

    //
    // console.log('role', allowRoles)
    // console.log('exist', user, isAuthenticated)
    if(allowRoles) {
        // console.log(allowRoles)
        // console.log('include', user?.roles?.find(role => allowRoles.includes(role.name)));

        for (let userRole of user?.roles) {
            for (let role of allowRoles) {
                if (userRole.name == role) {
                    // console.log('match');
                }
            }
        }
    }

    return (
        <>
            {!allowRoles || user?.roles?.find(role => allowRoles.includes(role.name)) ? (
                children
            ) : (
                <Navigate replace to="/session/signin" state={{ from: pathname }} />
            )}
        </>
    );
};

export default AuthGuard;
