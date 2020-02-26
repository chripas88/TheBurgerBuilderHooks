import reducer from '../../../store/reducers/auth';
import * as actionTypes from '../../../store/actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};

const authSuccessProps = {
	type: actionTypes.AUTH_SUCCESS,
	idToken: 'token',
	userId: 'userId'
};

const updatedStateAfterAuthSuccess = {
	token: 'token',
	userId: 'userId',
	error: null,
	loading: false,
	authRedirectPath: '/'
};

describe('auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	
	it('should store the token upon login', () => {
		expect(reducer(initialState, authSuccessProps)).toEqual(updatedStateAfterAuthSuccess);
	});
});