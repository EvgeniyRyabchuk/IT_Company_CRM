import axios from "axios";

export const API_URL_DEBUG = process.env.REACT_APP_API_URL_DEBUG;
export const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;

export const API_URL = API_URL_DEBUG;

export const API_URL_WITH_PUBLIC_STORAGE = `${API_URL}/storage`;



const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    // console.log(API_URL)
    if(config && config.headers) {
        config.withCredentials = true;
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        // config.headers.cacheControl = 'no-cache';
        // config.headers.pragma = 'no-cache';
    }
    return config;
})

//TODO: check if cookie exist
function isCookieExist(cookieName: string) {
    console.log('123');
    const theCookies = document.cookie.split(';');
    for (let i of theCookies) {
        if(i == cookieName)
            return true;
    }
    return false;
}

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await fetch(`${API_URL}/auth/refresh`, {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const data = await response.json();
            localStorage.setItem('token', data.authorisation.token);
            return $api.request(originalRequest);
        } catch (e) {
            if (error.response.status == 401) {
                // redirect to login form
                console.log('НЕ АВТОРИЗОВАН')
                throw new Error('Not auth');
            }
            throw e;
        }
    }
    throw error;
})

export default $api;
