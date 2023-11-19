import 'bootstrap';
import axios, { AxiosError, type AxiosStatic } from 'axios';

declare global {
  interface Window {
    axios: AxiosStatic;
  }
}

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            window.location.reload();
        }

        throw error
    }
);
