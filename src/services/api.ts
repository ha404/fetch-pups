import axios, { AxiosResponse } from 'axios';

// Define the Dog interface
interface Dog {
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

// Define the API service
const APIService = {
  authenticate: (data: LoginData): Promise<AxiosResponse<any>> => {
    return axios.post('/auth/login', data, { withCredentials: true });
  },

  getDogs: (): Promise<AxiosResponse<Dog[]>> => {
    return axios.get('/dogs/search', { withCredentials: true });
  },
};

export default APIService;
