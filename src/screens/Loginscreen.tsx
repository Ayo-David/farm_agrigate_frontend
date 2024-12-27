import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../../assets/images/logo.svg';

const LoginScreen = () => {
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
					placeholder='Email'
					style={styles.input}
					placeholderTextColor='#aaa'
					keyboardType='email-address'
				/>
				{/* Password Input */}
				<TextInput
					placeholder='Password'
					style={styles.input}
					placeholderTextColor='#aaa'
					secureTextEntry
				/>
			</View>

			{/* Login Button */}
			<TouchableOpacity style={styles.loginButton}>
				<Text style={styles.loginButtonText}>Login</Text>
			</TouchableOpacity>

			{/* Forgot Password */}
			<TouchableOpacity style={styles.forgotPassword}>
				<Text style={styles.forgotPasswordText}>Forget Password</Text>
			</TouchableOpacity>
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
	forgotPassword: {
		marginTop: 20,
	},
	forgotPasswordText: {
		color: '#555',
		fontSize: 14,
		textDecorationLine: 'underline',
	},
});
