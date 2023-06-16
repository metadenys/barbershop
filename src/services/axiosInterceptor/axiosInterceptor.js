import axios from 'axios';

export const mainInterceptor = axios.create({
    baseURL: process.env.REACT_APP_URL,
});
const handleRequest = (request) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
};
mainInterceptor.interceptors.request.use(req => handleRequest(req));
mainInterceptor.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/admin';
        }
        return Promise.reject(error.response.data);
    },
);