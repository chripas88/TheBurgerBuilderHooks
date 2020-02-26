import { useState, useEffect } from 'react';

export default httpClient => {
	const [error, setError] = useState(null);
	const request = httpClient.interceptors.request;
	const response = httpClient.interceptors.response;
	
	const requestInterceptor = httpClient.interceptors.request.use(request =>{
		setError(null);
		return request;
	});

	const responseInterceptor = httpClient.interceptors.response.use(response => response, err => {
		setError(err);
	});

	useEffect(() => {
		return () => {
			request.eject(requestInterceptor);
			response.eject(responseInterceptor);	
		};
	},[requestInterceptor, responseInterceptor, request, response]);

	const errorConfirmedHandler = () => {
		setError(null);
	}	
	
	return [error, errorConfirmedHandler]
}