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

const ProductForm: React.FC = () => {
	return (
		<ScrollView style={styles.container}>
			{/* Header Section */}
			<Image
				source={require('../../assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Product Form</Text>
				<TouchableOpacity>
					<Text style={styles.syncText}>Sync Data</Text>
				</TouchableOpacity>
			</View>

			{/* Dropdowns Section */}
			<View style={styles.row}>
				{/* Product Dropdown */}
				<TouchableOpacity style={styles.dropdown}>
					<Text style={styles.dropdownText}>Cassava</Text>
				</TouchableOpacity>

				{/* Quantity Dropdown */}
				<TouchableOpacity style={styles.dropdown}>
					<Text style={styles.dropdownText}>Full Keke</Text>
				</TouchableOpacity>
			</View>

			{/* Form Section */}
			<View style={styles.formContainer}>
				{/* Payee Input */}
				<TextInput
					style={styles.input}
					placeholder='Payee'
					placeholderTextColor='#B0B0B0'
				/>

				{/* Date Input */}
				<TextInput
					style={styles.input}
					placeholder='16 December 2024'
					placeholderTextColor='#B0B0B0'
				/>

				{/* Amount Input */}
				<TextInput
					style={styles.input}
					placeholder='Amount'
					placeholderTextColor='#B0B0B0'
					keyboardType='numeric'
				/>

				{/* Add Payee Button */}
				<TouchableOpacity style={styles.addPayeeButton}>
					<Text style={styles.addPayeeText}>Add Payee</Text>
				</TouchableOpacity>

				{/* Submit Button */}
				<TouchableOpacity style={styles.submitButton}>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default ProductForm;

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
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		marginVertical: 15,
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
	addPayeeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	addPayeeText: {
		marginLeft: 10,
		fontSize: 14,
		color: '#4CAF50',
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
