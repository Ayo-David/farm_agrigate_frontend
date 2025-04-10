import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { colour } from '../../assets/theme/colour';
import { INVOICE } from '@app/services/invoiceServices';
import { PRODUCT } from '@app/services/productServices';
import InvoiceList from '@app/components/invoiceList';
import { Navbar, SyncBar } from '@app/components';
import LoadingModal from '@app/components/loader';

type ProductType = {
	name: string;
	id: string;
};

const InvoicesScreen = ({ navigation }) => {
	const [productOptions, setProductOptions] = useState([]);
	const [invoiceList, setInvoiceList] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({} as ProductType);
	const [selectedInvoiceType, setSelectedInvoiceType] = useState('');
	const [isSyncing, setIsSyncing] = useState<boolean>(false);

	const getProducts = async () => {
		if (selectedInvoiceType !== null) {
			const productOptions = await PRODUCT.listAllProducts(selectedInvoiceType);
			if (productOptions.length > 0) {
				return setProductOptions(productOptions);
			}
		} else {
			console.log(`You neeed to select invoice type`);
		}
		return [];
	};

	const getAllInvoices = async () => {
		const allInvoices = await INVOICE.getAllInvoices();

		if (allInvoices.length === 0) {
			console.log(`No invoice had been created. Please add an invoice`);
		} else {
			//console.log(`allInvoices = `, allInvoices);
			return setInvoiceList(allInvoices);
		}
	};

	const goto = (screen, param) => navigation.navigate(screen, param);
	useEffect(() => {
		getAllInvoices();
		const unsubscribe = navigation.addListener('blur', () => {
			setSelectedInvoiceType('');
			setProductOptions([]);
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		getProducts();
	}, [selectedInvoiceType]);

	return (
		<SafeAreaView style={styles.container}>
			<Navbar
				title={'List Invoices'}
				backIcon
				// RightIcon={GearIcon}
				// onRightPress={onIconPress}
			/>
			{/* Header Image */}
			<Image
				source={require('../../assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>

			{/* Page Title and Sync Button */}
			<SyncBar setIsSyncing={setIsSyncing} />

			{/* Dropdown and Quantity Button */}
			<View style={styles.optionsRow}>
				<View style={styles.dropdownContainer}>
					<View style={styles.pickerWrapper}>
						<Text style={styles.pickerLabel}>Select Invoice Type</Text>
					</View>
					<Picker
						selectedValue={selectedInvoiceType}
						onValueChange={(item, index) => {
							return setSelectedInvoiceType(item);
						}}
						//onFocus={() => setSelectedQuantity(null)}
						style={styles.picker}
						mode='dropdown'>
						<Picker.Item key={0} label={'Select..'} value={null} />
						<Picker.Item key={1} label={'Products'} value={'P'} />
						<Picker.Item key={2} label={'Services'} value={'S'} />
					</Picker>
				</View>
				{/* Dropdown */}
				<View style={styles.dropdownContainer}>
					<View style={styles.pickerWrapper}>
						<Text style={styles.pickerLabel}>Select Product Type</Text>
					</View>
					<Picker
						selectedValue={selectedProduct}
						onValueChange={(item, index) => {
							const { id, name } = item;
							return setSelectedProduct({ id, name });
						}}
						//onFocus={() => setSelectedQuantity(null)}
						style={styles.picker}
						mode='dropdown'>
						<Picker.Item key={0} label={'Select..'} value={null} />
						{productOptions.map((item, index) => (
							<Picker.Item key={index} label={item.name} value={item} />
						))}
					</Picker>
				</View>
			</View>

			<InvoiceList invoiceList={invoiceList} goto={goto} />
			<LoadingModal message={'Syncing Data...'} visible={isSyncing} />
		</SafeAreaView>
	);
};

export default InvoicesScreen;

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
		overflow: 'hidden',
		width: '40%',
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
