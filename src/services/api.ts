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

  // getDogs: (): Promise<AxiosResponse<Dog[]>> => {
  //   return axios.get('/ogs/search', { withCredentials: true });
  // },
};

export default APIService;
