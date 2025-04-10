import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useAuthProvider } from '@app/context/authContext';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { useAppState } from '@app/context/appContext';

const AppContainer = createNativeStackNavigator<AppStackParamList>();

export default function App() {
	const { authState } = useAuthProvider();
	const { appState } = useAppState();

	const Root = () => {
		console.log(`appState = `, appState);
		if (authState.isLoggedIn) {
			return (
				<AppContainer.Screen
					name={'HomeStack'}
					component={HomeStack}
					options={{ headerShown: false }}
				/>
			);
		} else {
			return (
				<AppContainer.Screen
					name={'Auth'}
					component={AuthStack}
					options={{ headerShown: false }}
				/>
			);
		}
	};

	return (
		<NavigationContainer>
			<AppContainer.Navigator>{Root()}</AppContainer.Navigator>
		</NavigationContainer>
	);
}

export type AppStackParamList = {
	HomeStack: undefined;
	Auth: undefined;
};
