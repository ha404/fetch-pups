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
}

// Define the Search interface
interface Search {
  next: string;
  resultIds: string[];
  total: number;
}

const baseURL = 'https://frontend-take-home-service.fetch.com';

// Define the API service
const APIService = {
  authenticate: async (data: LoginData): Promise<AxiosResponse<any>> => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, data, {
        withCredentials: true,
      });
      console.log('Response: ', response);
      return response;
    } catch (error) {
      console.error('An error occurred while making the request: ', error);
      throw error;
    }
  },

  getDogsIds: async (params: QueryParams): Promise<AxiosResponse<Search>> => {
    try {
      const response = await axios.get(`${baseURL}/dogs/search`, {
        params,
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getDogs: async (data: string[]): Promise<AxiosResponse<Dog[]>> => {
    try {
      const response = await axios.post(`${baseURL}/dogs`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('getDogs status:', response.status); // log status

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default APIService;
