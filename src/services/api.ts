import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: 'No response from server. Please try again.' });
    } else {
      // Error in request configuration
      return Promise.reject({ message: 'Request failed. Please try again.' });
    }
  }
);

export const authApi = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyCode: async (userId: string, code: string) => {
    try {
      const response = await api.post(`/auth/verify/${userId}`, { code });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};