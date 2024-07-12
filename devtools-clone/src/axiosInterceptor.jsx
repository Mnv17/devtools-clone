// src/axiosInterceptor.js (continued)
import { useNetworkContext } from './Context/NetworkContext';
import axiosInstance from './axiosInstance';

export const useAxios = () => {
  const { dispatch } = useNetworkContext();

  axiosInstance.interceptors.response.use(
    response => {
      dispatch({
        type: 'ADD_REQUEST',
        payload: {
          name: response.config.url,
          status: response.status,
          type: response.config.method,
          initiator: response.config.headers['x-initiator'] || 'unknown',
          size: response.headers['content-length'] || 'unknown',
          time: response.duration,
        },
      });
      return response;
    },
    error => {
      dispatch({
        type: 'ADD_REQUEST',
        payload: {
          name: error.config.url,
          status: error.response?.status || 'Error',
          type: error.config.method,
          initiator: error.config.headers['x-initiator'] || 'unknown',
          size: error.response?.headers['content-length'] || 'unknown',
          time: error.duration,
        },
      });
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
