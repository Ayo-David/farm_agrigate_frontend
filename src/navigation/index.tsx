import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from '../screens/CreateInvoicescreen';

const AppContainer = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<AppContainer.Navigator initialRouteName='HomeScreen'>
				<AppContainer.Screen name={'HomeScreen'} component={LoginScreen} />
			</AppContainer.Navigator>
		</NavigationContainer>
	);
}
