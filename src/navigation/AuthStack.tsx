import HomeScreen from '@app/screens/Homescreen';
import LoginScreen from '@app/screens/Loginscreen';
import SignUpScreen from '@app/screens/Signupscreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeStack from './HomeStack';
import TabBar from './TabBar';

const AuthStack = createNativeStackNavigator();

const AuthStackComponent = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginScreen'>
			<AuthStack.Screen name={'LoginScreen'} component={LoginScreen} />
			<AuthStack.Screen name={'SignUpScreen'} component={SignUpScreen} />
			<AuthStack.Screen name={'HomeStack'} component={TabBar} />
		</AuthStack.Navigator>
	);
};

export default AuthStackComponent;
