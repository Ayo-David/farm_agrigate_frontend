import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import { signUp } from '@app/services/authServices';
import { Picker } from '@react-native-picker/picker';
import LOCATION from '@app/services/location';
import { colour } from '@assets/theme/colour';
import { useIsFocused } from '@react-navigation/native';
import database from '@app/database/database';
import seedDatabase from '@app/database/seedDatabase';
import { useAppState } from '@app/context/appContext';
import { appConstant } from '@app/constants/authConstant';
import { addData } from '@app/helpers/encryptedStorage';
import { showToast } from '@app/helpers/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = ({ navigation }) => {
	const goto = (screen) => navigation.navigate(screen);

	const isFocused = useIsFocused();
	//create and use appContext here - to safe locations
	const { dispatchAppState } = useAppState();

	const [fullname, setFullname] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [locations, setLocations] = useState<[]>([]);
	const [selectedLocation, setSelectedLocation] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const getLocation = async () => {
		//sample fetch from watermelonDB
		//console.log(`++++++++++`);
		//const locationCollection = database.get('locations');

		// const users = await database.get('locations').query().fetch();
		// console.log(`locccccc = `, users);

		// const locationList = await locationCollection
		// 	.query()
		// 	.fetch()
		// 	.then((item) => {
		// 		//console.log(`itemsss = `, item);
		// 		return item?.map((l) => l._raw);
		// 	});

		// console.log(`locationList = `, locationList);

		const location: [] = await LOCATION.getLocation();

		return setLocations(location);
	};

	const handleSignup = async () => {
		//do some validations here - eg. email validation
		if (password != confirmPassword) {
			showToast(`Password Mismatch!`, 'error');
			return console.error('Password Mismatch!');
		}
		try {
			const location = selectedLocation;
			const signIn = await signUp(fullname, phone, email, location, password);

			if (signIn.success) {
				dispatchAppState({
					type: appConstant.SET_LOCATION,
					payload: { location: selectedLocation },
				});
				await addData('location', { location: selectedLocation });
				showToast('Registration is successful, please login', 'success');
				return goto('LoginScreen');
			}
		} catch (err) {
			console.log(typeof err);
			//showToast(err.Error.toString(), 'error');
			console.log(`signup error = `, err);
		}
	};

	useState(() => {
		getLocation();
	}, [isFocused]);
	return (
		<View style={styles.container}>
			{/* <View> */}
			{/* Logo Section */}
			<View style={styles.logoContainer}>
				<Logo style={styles.logo} />
				<Text style={styles.logoText}>CASSAVA PRO</Text>
			</View>

			{/* Registration Form */}
			<KeyboardAwareScrollView
				style={styles.innerContainer}
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
				enableOnAndroid={true}
				extraScrollHeight={20} // Adjust as needed
				keyboardShouldPersistTaps='handled'>
				<View style={styles.formContainer}>
					<Text style={styles.welcomeText}>Welcome!</Text>
					<Text style={styles.subText}>Registration Page</Text>
					<TextInput
						style={styles.input}
						placeholder='Full Name'
						value={fullname}
						onChangeText={setFullname}
					/>
					<TextInput
						style={styles.input}
						placeholder='Phone'
						value={phone}
						inputMode='numeric'
						onChangeText={setPhone}
					/>
					<TextInput
						style={styles.input}
						placeholder='Email'
						keyboardType='email-address'
						value={email}
						onChangeText={setEmail}
					/>

					<View style={styles.pickerInput}>
						{/* Category Dropdown */}
						<View style={styles.dropdown}>
							<Picker
								selectedValue={selectedLocation}
								onValueChange={(item) => {
									return setSelectedLocation(item);
								}}
								//onFocus={() => setSelectedQuantity(null)}
								style={styles.picker}
								mode='dropdown'>
								<Picker.Item
									label={'Select Location'}
									value={null}
									style={{ color: colour.grey }}
								/>
								{locations.map((item, index) => (
									<Picker.Item key={index} label={item.name} value={item.name} />
								))}
							</Picker>
						</View>
					</View>
					<TextInput
						style={styles.input}
						placeholder='Password'
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					<TextInput
						style={styles.input}
						placeholder='Confirm Password'
						secureTextEntry
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>

					<TouchableOpacity style={styles.button} onPress={() => handleSignup()}>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
			{/* </View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		//alignItems: 'flex-start',
		//justifyContent: 'flex-start',
	},
	innerContainer: {
		flex: 1,
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		//marginTop: 10,
	},
	logo: {
		width: 50,
		height: 50,
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
	pickerInput: {
		width: '90%',
		backgroundColor: '#ffffff',
		borderRadius: 25,
		//padding: 15,
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
	dropdown: {
		flex: 1,
		justifyContent: 'center',
		marginRight: 10,
		marginLeft: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 25,
		//width: '65%',
	},
	picker: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		//height: 40,
	},
});

export default SignUpScreen;
