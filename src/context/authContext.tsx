import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { authConstant } from '../constants/authConstant';

type authState = {
	username: string;
	password: string;
	token: string;
	isLoggedIn: boolean;
};

type dispatchDt = {
	type: authConstant;
	payload: authState;
};

interface AuthContextDt {
	authState: authState;
	dispatchauthstate: React.Dispatch<dispatchDt>;
}

const initialState = {
	username: '',
	password: '',
	token: '',
	isLoggedIn: false,
};

const loginReducer = (state: authState, { type, payload }: dispatchDt) => {
	switch (type) {
		case authConstant.SET_USER:
			return {
				...state,
				username: payload.username,
				token: payload.token,
				isLoggedIn: true,
			};
		case authConstant.LOGIN_FAIL:
			return {
				...state,
				username: null,
				isLoggedIn: false,
			};
		default:
			return {
				...state,
			};
	}
};

export const AuthContext = createContext<AuthContextDt>({} as AuthContextDt);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, dispatchauthstate] = useReducer(loginReducer, initialState);

	return (
		<AuthContext.Provider value={{ authState, dispatchauthstate }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthProvider = () => useContext(AuthContext);
