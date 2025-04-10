import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { getAllUsers, login } from '@app/services/authServices';
import database from '@app/database/database';
import { showToast } from '@app/helpers/utils';

const LoginScreen = () => {
	const navigation = useNavigation();
	const goto = (screen) => navigation.navigate(screen);

	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		console.log(`I'm hererererererer`);

		try {
			const user = await login(phone, password);

			if (user.success) goto('HomeStack');
			//goto('HomeStack');
		} catch (error) {
			console.log(`Error: ${error}`);
			return showToast('Incorrect Login, try again!', 'error');
		}
	};
	return (
		<View style={styles.container}>
			{/* Logo */}
			<View style={styles.logoContainer}>
				<Logo style={styles.logo} />

				<Text style={styles.logoText}>CASSAVA PRO</Text>
			</View>

			{/* Welcome Text */}
			<View style={styles.welcomeContainer}>
				<Text style={styles.welcomeText}>Welcome Back!</Text>
				<Text style={styles.subtitleText}>Login Page</Text>
			</View>

			{/* Form Inputs */}
			<View style={styles.inputContainer}>
				{/* Email Input */}
				<TextInput
					placeholder='Phone'
					style={styles.input}
					placeholderTextColor='#aaa'
					value={phone}
					inputMode='tel'
					onChangeText={setPhone}
				/>
				{/* Password Input */}
				<TextInput
					placeholder='Password'
					style={styles.input}
					placeholderTextColor='#aaa'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>

			{/* Login Button */}
			<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
				<Text style={styles.loginButtonText}>Login</Text>
			</TouchableOpacity>

			{/* Forgot Password */}
			<View style={styles.forgotPasswordCol}>
				<TouchableOpacity style={styles.registerLink} onPress={() => goto('SignUpScreen')}>
					<Text style={styles.forgotPasswordText}>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.forgotPassword}>
					<Text style={styles.forgotPasswordText}>Forget Password</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
	},
	logoContainer: {
		marginTop: 50,
		alignItems: 'center',
	},
	logo: {
		width: 100,
		height: 100,
	},
	logoText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#6ABF4B', // Green color matching the design
		marginTop: 10,
	},
	welcomeContainer: {
		marginTop: 30,
		alignItems: 'center',
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1B1B1B',
	},
	subtitleText: {
		fontSize: 16,
		color: '#555',
		marginTop: 5,
	},
	inputContainer: {
		marginTop: 40,
		width: '100%',
	},
	input: {
		backgroundColor: '#F8F8F8',
		borderRadius: 25,
		paddingHorizontal: 15,
		height: 50,
		fontSize: 16,
		color: '#333',
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	loginButton: {
		backgroundColor: '#6ABF4B',
		borderRadius: 25,
		height: 50,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 3,
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	registerLink: {
		marginTop: 20,
		marginRight: 20,
	},
	forgotPassword: {
		marginTop: 20,
	},

	forgotPasswordCol: { flexDirection: 'row' },

	forgotPasswordText: {
		color: '#555',
		fontSize: 14,
		textDecorationLine: 'underline',
	},
});
