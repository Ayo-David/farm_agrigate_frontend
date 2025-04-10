import { appConstant } from '@app/constants/authConstant';
import { createContext, useContext, useReducer } from 'react';

export type appStateType = {
	location: string;
};

const initialState: appStateType = {
	location: '',
};

const reducer = (state: appStateType, { type, payload }) => {
	switch (type) {
		case appConstant.SET_LOCATION:
			return { ...state, location: payload.location };

		default:
			return { ...state };
	}
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [appState, dispatchAppState] = useReducer(reducer, initialState);
	return (
		<AppContext.Provider value={{ appState, dispatchAppState }}>{children}</AppContext.Provider>
	);
};

export const useAppState = () => useContext(AppContext);
