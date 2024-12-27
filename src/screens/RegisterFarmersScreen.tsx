import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image,
} from 'react-native';

const FarmersRegistration: React.FC = () => {
	return (
		<ScrollView style={styles.container}>
			{/* Header Section */}
			<Image
				source={require('../../assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Registration Page</Text>
				<TouchableOpacity>
					<Text style={styles.syncText}>Sync Data</Text>
				</TouchableOpacity>
			</View>

			{/* Personal Details Section */}
			<View style={styles.formContainer}>
				<Text style={styles.formTitle}>Personal Details</Text>

				{/* Name Input */}
				<TextInput style={styles.input} placeholder='Name' placeholderTextColor='#B0B0B0' />

				{/* Phone Number Input */}
				<TextInput
					style={styles.input}
					placeholder='+234'
					placeholderTextColor='#B0B0B0'
					keyboardType='phone-pad'
				/>

				{/* Address Input */}
				<TextInput
					style={styles.input}
					placeholder='Address'
					placeholderTextColor='#B0B0B0'
				/>

				{/* Dropdowns */}
				<View style={styles.row}>
					{/* Category Dropdown */}
					<TouchableOpacity style={styles.dropdown}>
						<Text style={styles.dropdownText}>Category (Youth)</Text>
					</TouchableOpacity>

					{/* Sex Dropdown */}
					<TouchableOpacity style={styles.dropdown}>
						<Text style={styles.dropdownText}>Sex (Male)</Text>
					</TouchableOpacity>
				</View>

				{/* Submit Button */}
				<TouchableOpacity style={styles.submitButton}>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default FarmersRegistration;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
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
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	dropdown: {
		flex: 1,
		height: 45,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		justifyContent: 'center',
		marginRight: 10,
		backgroundColor: '#FFFFFF',
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
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});
