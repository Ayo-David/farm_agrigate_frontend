import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import ProductScreen from '@app/screens/Productscreen';
import ComingSoonScreen from '@app/screens/ComingSoon';

const TBar = createBottomTabNavigator();

const TabBar = () => {
	return (
		<TBar.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName: string;

					if (route.name === 'Home') {
						iconName = 'home-roof';
						return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
					} else if (route.name === 'Settings') {
						iconName = 'settings';
					} else if (route.name === 'Profile') {
						iconName = 'person';
					} else {
						iconName = 'alert-circle';
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarLabelStyle: {
					marginBottom: 10,
					fontSize: 12,
				},
				tabBarStyle: {
					height: 60,
				},
				tabBarActiveTintColor: 'green',
				tabBarInactiveTintColor: 'gray',
				headerShown: false,
			})}>
			<TBar.Screen component={HomeStack} name={'Home'} />
			<TBar.Screen component={ComingSoonScreen} name={'Profile'} />
			<TBar.Screen component={ComingSoonScreen} name={'Settings'} />
		</TBar.Navigator>
	);
};

export default TabBar;
