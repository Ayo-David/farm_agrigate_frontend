import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ProductPage = () => {
	const [selectedProduce, setSelectedProduce] = useState<string>('Cassava');

	const produceOptions = ['Cassava', 'Beans', 'Maize'];

	return (
		<SafeAreaView style={styles.container}>
			{/* Header Image */}
			<Image
				source={require('../../assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>

			{/* Page Title and Sync Button */}
			<View style={styles.headerRow}>
				<Text style={styles.title}>Product Page</Text>
				<TouchableOpacity style={styles.syncButton}>
					<Ionicon name={'sync'} />
					{/* <Image
						source={require('./assets/icons/sync.png')} // Replace with your sync icon path
						style={styles.syncIcon}
					/> */}
					<Text style={styles.syncText}>Sync Data</Text>
				</TouchableOpacity>
			</View>

			{/* Dropdown and Quantity Button */}
			<View style={styles.optionsRow}>
				{/* Dropdown */}
				<View style={styles.dropdownContainer}>
					<Picker
						selectedValue={selectedProduce}
						onValueChange={(itemValue) => setSelectedProduce(itemValue)}
						style={styles.picker}>
						{produceOptions.map((item, index) => (
							<Picker.Item key={index} label={item} value={item} />
						))}
					</Picker>
				</View>

				{/* Quantity Button */}
				<TouchableOpacity style={styles.quantityButton}>
					<Text style={styles.quantityText}>Quantity</Text>
				</TouchableOpacity>
			</View>

			{/* Produce List */}
			<View style={styles.produceList}>
				<FlatList
					data={produceOptions}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<View style={styles.produceItem}>
							{/* <Image
								source={require('./assets/icons/leaf.png')} // Replace with your leaf icon path
								style={styles.produceIcon}
							/> */}
							<Text style={styles.produceText}>{item}</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProductPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headerImage: {
		width: '100%',
		height: 150,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
	},
	syncButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	syncIcon: {
		width: 20,
		height: 20,
		marginRight: 5,
	},
	syncText: {
		fontSize: 14,
		color: '#007AFF',
	},
	optionsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 20,
	},
	dropdownContainer: {
		width: '40%',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		overflow: 'hidden',
	},
	picker: {
		width: '100%',
		height: 40,
	},
	quantityButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	quantityText: {
		fontSize: 14,
		color: '#fff',
		textAlign: 'center',
	},
	produceList: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	produceItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	produceIcon: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	produceText: {
		fontSize: 14,
		color: '#333',
	},
});
