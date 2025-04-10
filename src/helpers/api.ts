import { BASE_URL, BASE_URL_LOCAL } from '@env';
import axios from 'axios';

const url = __DEV__ ? BASE_URL : BASE_URL_LOCAL;
const api = axios.create({
	baseURL: url,
	timeout: 10000, // Timeout in milliseconds
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		console.log('Request sent:', config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log('Response error:', error);
		return Promise.reject(error);
	},
);

export default api;
