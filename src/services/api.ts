import axios, { AxiosResponse } from 'axios';

// Define the Dog interface
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

// Define the LoginData interface
interface LoginData {
  name: string;
  email: string;
}

// Define the QueryParams interface
interface QueryParams {
  size: number;
  sort: string;
  from?: number;
  next?: string;
  breeds?: string[] | null;
}

// Define the Search interface
interface Search {
  next: string;
  resultIds: string[];
  total: number;
}

// Hide this in env later
const baseURL = 'https://frontend-take-home-service.fetch.com';

// Define the axios interceptor to catch 401s for re-auth
const apiInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authData = JSON.parse(localStorage.getItem('authData') || 'null');
      if (authData) {
        const res = await APIService.authenticate(authData);
        if (res.status === 200) {
          console.log('re-auth success:', res.status);
          return apiInstance(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Define the API service
const APIService = {
  authenticate: async (data: LoginData): Promise<AxiosResponse<any>> => {
    try {
      localStorage.setItem('authData', JSON.stringify(data));
      const response = await apiInstance.post(`/auth/login`, data);
      console.log('auth response:', response.status);
      return response;
    } catch (error) {
      console.error('An error occurred while making the request: ', error);
      throw error;
    }
  },

  getDogsIds: async (params: QueryParams): Promise<AxiosResponse<Search>> => {
    try {
      const response = await apiInstance.get(`/dogs/search`, { params });
      console.log('getDogsIds response:', response.status);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getDogs: async (data: string[]): Promise<AxiosResponse<Dog[]>> => {
    try {
      const response = await apiInstance.post(`/dogs`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('getDogs status:', response.status);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiInstance.post('/auth/logout');
      console.log('Logout successful');
      // localStorage.removeItem('authData'); // clear the loginData from localStorage on logout
    } catch (error) {
      console.error('An error occurred while logging out: ', error);
      throw error;
    }
  },
};

export default APIService;
