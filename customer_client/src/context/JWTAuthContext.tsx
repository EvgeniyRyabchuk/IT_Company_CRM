import React, {createContext, useEffect, useReducer} from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {JWTAuthContextInitialState, LoginRequest, RegisterRequest, RoleEntity, RoleName} from "../types/auth";
import AuthService from "../services/AuthService";
import {MyLoader} from "../components/layout/LayoutSuspence";

const initialState : JWTAuthContextInitialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    rolesEntity: null,
}

const isValidToken = (accessToken: string) : any => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    // @ts-ignore
    return decodedToken.exp > currentTime
}

const setSession = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('token', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state: JWTAuthContextInitialState, action: any) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user, rolesEntity} = action.payload
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
                rolesEntity,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user: {...user},
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                rolesEntity: null,
                lastChats: [],
                counter: null
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'EMAIL_VERIFY':
        {
            const { user } = action.payload

            return {
                ...state,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}


const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: (args: LoginRequest) => Promise.resolve(),
    logout: () => { },
    register: (args: RegisterRequest) => Promise.resolve(),
    profile: () => Promise.resolve(),
    profileDetail: () => Promise.resolve(),
    getUserEntityByRoleName: (roleName: RoleName | RoleName[], list: RoleEntity[]) => { }
})

export const AuthProvider = ({ children } : any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (args: LoginRequest) => {

        const { data } = await AuthService.login(args);

        const { authorisation, user } = data;

        // set access token
        setSession(authorisation.token)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (args : RegisterRequest) => {
        const response = await AuthService.register(args);

        const { authorisation, user } = response.data;

        setSession(authorisation.token)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = async () => {
        try {
            await AuthService.logout();
        }
        catch (ex) {
            console.error(ex);
        }
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    const profile = async () => {
        try {
            const accessToken = window.localStorage.getItem('token')

            if (accessToken) {
                setSession(accessToken)
                const response = await AuthService.profile(false);
                const user = response.data.user;

                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                })
            } else {
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                        rolesEntity: null
                    },
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: false,
                    user: null,
                    rolesEntity: null
                },
            })
        }
    }

    const profileDetail = async () => {
        const response = await AuthService.profile(true);
        const user = response.data.user;
        const roleEntityList = response.data.roleEntity;
        const lastChats = response.data.lastChats;

        dispatch({
            type: 'INIT',
            payload: {
                isAuthenticated: true,
                user,
                rolesEntity: roleEntityList,
                lastChats,
            },
        })
    }

    const getUserEntityByRoleName = (roleName: string | string[], list: RoleEntity[]) => {
        if (!roleName || !list) return;
        if(Array.isArray(roleName)) {
            const resArray = [];
            for (let name of roleName) {
                for (let entity of list) {
                    if(name === entity.role.name) {
                        resArray.push(entity);
                    }
                }
            }
            return resArray;
        } else {
            return list.find((er: RoleEntity) =>
                er.role.name === roleName && er.entity
            )?.entity
        }
    }


    useEffect(() => {
        profile();
    }, [])

    if (!state.isInitialised) {
        return <MyLoader />;
    }


    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                profile,
                profileDetail,
                getUserEntityByRoleName,

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
