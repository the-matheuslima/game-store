import axios from 'axios';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
	baseURL: apiConfig.baseUrl,
	headers: {
		'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_KEY}`,
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
	}
});

export default axiosClient
