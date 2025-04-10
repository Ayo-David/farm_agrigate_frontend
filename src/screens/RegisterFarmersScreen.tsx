import { Picker } from '@react-native-picker/picker';
import { colour } from '../../assets/theme/colour';
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image,
	Alert,
} from 'react-native';
import { createPayee } from '@app/services/payeeServices';
import { appStateType, useAppState } from '@app/context/appContext';
import { getData } from '@app/helpers/encryptedStorage';
import { Navbar, SyncBar } from '@app/components';
import LoadingModal from '@app/components/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterFarmersScreen: React.FC = ({ navigation }) => {
	const { appState } = useAppState();

	const getStoredLocation = async () => {
		const response = await getData('location');
		setStoredLocation(response.location);
		return;
	};

	const goto = (screen, params) => {
		return navigation.navigate(screen, params);
	};

	const [fullName, setFullName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [storedLocation, setStoredLocation] = useState<string>('');
	const [isSyncing, setIsSyncing] = useState<boolean>(false);

	const handleCreatePayee = async () => {
		try {
			const insertPayee = await createPayee({
				fullName,
				phone,
				address,
				category,
				gender,
				location: storedLocation ?? appState.location,
			});
			if (insertPayee.success) {
				//Alert.alert('Success', 'Payee successfully Registered', );
				goto('NotificationScreen', {
					message: 'Payee successfully Registered',
					type: 'success',
					title: 'Successful!',
				});
				return console.log(`Payee successfully created`);
			}
		} catch (error) {
			console.error('Error inserting Payee', error);
		}
	};
	useEffect(() => {
		getStoredLocation();
	}, []);

	return (
		<View style={styles.container}>
			<Navbar title={'Register Farmer'} backIcon />
			{/* Header Section */}
			<Image
				source={require('../../assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>
			<SyncBar setIsSyncing={setIsSyncing} />

			{/* Personal Details Section */}
			<KeyboardAwareScrollView
				style={styles.innerContainer}
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
				enableOnAndroid={true}
				extraScrollHeight={20} // Adjust as needed
				keyboardShouldPersistTaps='handled'>
				<View style={styles.formContainer}>
					<Text style={styles.formTitle}>Personal Details</Text>

					{/* Name Input */}
					<TextInput
						style={styles.input}
						placeholder='Full Name'
						placeholderTextColor='#B0B0B0'
						value={fullName}
						onChangeText={setFullName}
					/>

					{/* Phone Number Input */}
					<TextInput
						style={styles.input}
						placeholder='+234'
						placeholderTextColor='#B0B0B0'
						keyboardType='phone-pad'
						value={phone}
						onChangeText={setPhone}
					/>

					{/* Address Input */}
					<TextInput
						style={styles.input}
						placeholder='Address'
						placeholderTextColor='#B0B0B0'
						value={address}
						onChangeText={setAddress}
					/>

					{/* Dropdowns */}
					<View style={styles.row}>
						{/* Category Dropdown */}
						<View style={styles.dropdown}>
							<Picker
								selectedValue={category}
								onValueChange={(item) => {
									return setCategory(item);
								}}
								//onFocus={() => setSelectedQuantity(null)}
								style={styles.picker}
								mode='dropdown'>
								<Picker.Item
									label={'Select Category'}
									value={null}
									style={{ color: colour.grey }}
								/>

								<Picker.Item label={'Farmers'} value='Farmers' />
								<Picker.Item label={'Women'} value='Women' />
								<Picker.Item
									label={'Youths (Labourers)'}
									value='Youth (Labourers)'
								/>
							</Picker>
						</View>

						{/* Sex Dropdown */}
						<View style={styles.dropdownSex}>
							<Picker
								selectedValue={gender}
								onValueChange={(item) => {
									return setGender(item);
								}}
								//onFocus={() => setSelectedQuantity(null)}
								style={styles.picker}
								mode='dropdown'>
								<Picker.Item
									label={'Gender'}
									value={null}
									style={{ color: colour.grey }}
								/>

								<Picker.Item label={'Male'} value='Male' />
								<Picker.Item label={'Female'} value='Female' />
							</Picker>
						</View>
					</View>

					{/* Submit Button */}
					<TouchableOpacity style={styles.submitButton} onPress={handleCreatePayee}>
						<Text style={styles.submitButtonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
			<LoadingModal message={'Syncing Data...'} visible={isSyncing} />
		</View>
	);
};

export default RegisterFarmersScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	innerContainer: { flex: 1 },
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: '#F9F9F9',
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000000',
	},

	syncText: {
		fontSize: 14,
		color: '#4CAF50',
		fontWeight: '500',
	},
	formContainer: {
		marginHorizontal: 20,
		marginTop: 20,
		backgroundColor: '#F3F3F3',
		borderRadius: 8,
		padding: 15,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	formTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 15,
		color: '#000000',
	},
	input: {
		height: 45,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: '#FFFFFF',
		marginBottom: 15,
		fontSize: 14,
	},
	picker: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		//height: 40,
	},
	pickerWrapper: { marginBottom: 2 },
	pickerLabel: { color: colour.grey, fontSize: 12 },
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	dropdown: {
		flex: 1,
		justifyContent: 'center',
		marginRight: 10,
		backgroundColor: '#FFFFFF',
		width: '65%',
	},
	dropdownSex: {
		marginRight: 10,
		backgroundColor: '#FFFFFF',
		width: '35%',
	},
	dropdownText: {
		fontSize: 14,
		color: '#B0B0B0',
	},
	submitButton: {
		height: 45,
		backgroundColor: '#4CAF50',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});
