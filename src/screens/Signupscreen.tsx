import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../../assets/images/logo.svg';

const SignUpScreen = () => {
	return (
		<View style={styles.container}>
			{/* Logo Section */}
			<View style={styles.logoContainer}>
				<Logo style={styles.logo} />
				<Text style={styles.logoText}>CASSAVA PRO</Text>
			</View>

			{/* Registration Form */}
			<View style={styles.formContainer}>
				<Text style={styles.welcomeText}>Welcome!</Text>
				<Text style={styles.subText}>Registration Page</Text>

				<TextInput style={styles.input} placeholder='Name' />
				<TextInput style={styles.input} placeholder='Email' keyboardType='email-address' />
				<TextInput style={styles.input} placeholder='Password' secureTextEntry />

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
	logo: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
	logoText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#0F9D58',
		marginTop: 10,
	},
	formContainer: {
		flex: 2,
		width: '100%',
		backgroundColor: '#0F9D58',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		alignItems: 'center',
		padding: 20,
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#ffffff',
		marginTop: 20,
	},
	subText: {
		fontSize: 16,
		color: '#ffffff',
		marginBottom: 20,
	},
	input: {
		width: '90%',
		backgroundColor: '#ffffff',
		borderRadius: 25,
		padding: 15,
		marginVertical: 10,
		fontSize: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
	},
	button: {
		width: '90%',
		backgroundColor: '#ffffff',
		borderRadius: 25,
		padding: 15,
		alignItems: 'center',
		marginTop: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#0F9D58',
	},
});

export default SignUpScreen;
