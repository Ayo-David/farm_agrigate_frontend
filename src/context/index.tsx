import React, { ReactNode } from 'react';
import { AuthProvider } from './authContext';
import { AppProvider } from './appContext';

const Provider = ({ children }: { children: ReactNode }) => {
	return (
		<AppProvider>
			<AuthProvider>{children}</AuthProvider>
		</AppProvider>
	);
};

export default Provider;
