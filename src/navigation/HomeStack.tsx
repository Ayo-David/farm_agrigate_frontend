import NotificationScreen from '@app/components/notification';
import ViewInvoiceScreen from '@app/components/viewInvoice';
import ComingSoonScreen from '@app/screens/ComingSoon';
import HomeScreen from '@app/screens/Homescreen';
import InvoicesScreen from '@app/screens/Invoicesscreen';
import ProductScreen from '@app/screens/Productscreen';
import RegisterFarmersScreen from '@app/screens/RegisterFarmersScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const AStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
	return (
		<AStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
			<AStack.Screen name={'HomeScreen'} component={HomeScreen} />
			<AStack.Screen name={'ProductScreen'} component={ProductScreen} />
			<AStack.Screen name={'RegisterFarmersScreen'} component={RegisterFarmersScreen} />
			<AStack.Screen name={'InvoicesScreen'} component={InvoicesScreen} />
			<AStack.Screen name={'ViewInvoiceScreen'} component={ViewInvoiceScreen} />
			<AStack.Screen name={'NotificationScreen'} component={NotificationScreen} />
			<AStack.Screen name={'ComingSoonScreen'} component={ComingSoonScreen} />
		</AStack.Navigator>
	);
};

export type HomeStackParamList = {
	HomeScreen: undefined;
	ProductScreen: { productType: string };
	CreateInvoiceScreen: undefined;
	RegisterFarmersScreen: undefined;
	InvoicesScreen: undefined;
	ViewInvoiceScreen: {
		id: string;
		txn_id: string;
		invoice_no: string;
		product_no: string;
		status: string;
		quantity: string;
		payee_id: string;
		date: string;
		amount: string;
	};
	NotificationScreen: {
		message: string;
		type: string;
		title: string;
	};
	ComingSoonScreen: undefined;
};

export default HomeStack;
