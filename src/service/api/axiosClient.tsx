import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
	baseURL: apiConfig.baseUrl,
	headers: {
		'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
	}
});

// axiosClient.interceptors.request.use(
// 	async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => config
// );

// axiosClient.interceptors.response.use(
// 	(response) => {
// 		if (response && response.data) {
// 			return response.data;
// 		}

// 		return response;
// 	},
// 	(error: AxiosError): Promise<AxiosError> => {
// 		throw error;
// 	}
// );

export default axiosClient
