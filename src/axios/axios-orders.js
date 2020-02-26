import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://the-burger-builder-ce48e.firebaseio.com/'
});

export default instance;