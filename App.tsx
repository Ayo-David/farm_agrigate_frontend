import React, { useEffect } from 'react';
import Navigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import seedDatabase from '@app/database/seedDatabase';
const App = () => {
	const toastConfig = {
		success: (props) => (
			<BaseToast
				{...props}
				text1Style={{
					fontSize: 14,
					fontWeight: '400',
				}}
				text2Style={{
					fontSize: 13,
				}}
			/>
		),

		error: (props) => (
			<ErrorToast
				{...props}
				text1Style={{
					fontSize: 14,
				}}
				text2Style={{
					fontSize: 13,
				}}
			/>
		),
	};
	useEffect(() => {
		// Hide splash screen after the app is ready
		SplashScreen.hide();
		seedDatabase();
	}, []);

	return (
		<>
			<Navigator />;
			<Toast config={toastConfig} />
		</>
	);
};

export default App;
