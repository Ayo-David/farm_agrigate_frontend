import React, { useEffect, useState } from 'react';
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

import database from '@app/database/database';
import { useIsFocused } from '@react-navigation/native';
import { Q } from '@nozbe/watermelondb';
import { colour } from '../../assets/theme/colour';
import CreateInvoiceComponent from '@app/components/createInvoice';
import { INVOICE } from '@app/services/invoiceServices';
import { InvoiceType } from '@app/interfaces';
import { QUANTITY } from '@app/services/quantityServices';
import { PRODUCT } from '@app/services/productServices';
import { dateToTimestamp, showToast, tsToDateTime } from '@app/helpers/utils';
import { Navbar, SyncBar } from '@app/components';
import LoadingModal from '@app/components/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type ProductType = {
	name: string;
	id: string;
};

const ProductScreen = ({ navigation, route }) => {
	const { productType } = route.params;
	const isFocused = useIsFocused();
	const [productOptions, setProductOptions] = useState([]);
	const [quantityList, setQuantityList] = useState([]);

	const [selectedProduct, setSelectedProduct] = useState({} as ProductType);
	const [selectedQuantity, setSelectedQuantity] = useState<string>(null);

	//const currentDate = tsToDateTime(Date.now()).toISOString();

	const [date, setDate] = useState(new Date());
	const [payee, setPayee] = useState({} as ProductType);
	const [amount, setAmount] = useState<number>(0);
	const [payeeFound, setPayeeFound] = useState<boolean>(false);
	const [isSyncing, setIsSyncing] = useState<boolean>(false);

	const getProducts = async () => {
		const productOptions = await PRODUCT.listAllProducts(productType);
		if (productOptions.length > 0) {
			return setProductOptions(productOptions);
		}
		return [];
	};

	const getQuantity = async () => {
		const quantityList = await QUANTITY.listAllQuantity();

		if (quantityList.length > 0) {
			return setQuantityList(quantityList);
		}
		return [];
	};

	const insertInvoice = async () => {
		console.log(`date = `, date);
		console.log(`Timestamp = `, dateToTimestamp(date));

		if (!payeeFound) {
			showToast(`${payee.full_name} is not found. Add it or select another payee`, 'error');
			return;
		} else if (amount === 0 || amount == '' || date == null) {
			showToast('Payee Name, Amount or Date can not be empty', 'error');
			return;
		}
		const serialNo = await INVOICE.getSerial();
		const prodNo = await INVOICE.getProductNo();

		const data = {} as InvoiceType;

		console.log(`Payee, amount`, payee.id, amount);

		data.invoiceNo = `${'INV' + serialNo}`;
		data.productNo = `${'OPA' + 'T' + prodNo + 'K' + prodNo}`;
		data.txnID = Math.ceil(Math.random() * 1000000000).toString();
		data.productId = selectedProduct.id;
		data.payeeId = payee.id;
		data.quantity = selectedQuantity;
		data.amount = amount.toString();
		data.date = dateToTimestamp(date);
		//data.createdAt = date;

		//console.log(`data = `, data);

		const postInvoice = await INVOICE.postInvoice(data);
		if (postInvoice.success) {
			goto('NotificationScreen', { message: postInvoice?.message });
			console.log(`postInvoice = `, postInvoice);
		}
	};

	const goto = (screen, param) => navigation.navigate(screen, param);
	const deleteInvoice = async (id: string) => {
		return await INVOICE.deleteInvoice(id);
	};
	useEffect(() => {
		//deleteInvoice('YzBH4a5bxbe1yCKf');
		getProducts();
		getQuantity();
	}, [isFocused]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('blur', () => {
			setSelectedProduct({}); // Reset selection when leaving screen
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<Navbar
				title={'Product Invoicing'}
				backIcon
				// RightIcon={GearIcon}
				// onRightPress={onIconPress}
			/>
			{/* Header Image */}
			{/* <Image
				source={require('../../assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/> */}

			{/* Sync Bar */}
			<SyncBar setIsSyncing={setIsSyncing} />

			{/* Dropdown and Quantity Button */}
			{/* <KeyboardAwareScrollView
				style={styles.innerContainer}
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
				enableOnAndroid={true}
				extraScrollHeight={20} // Adjust as needed
				keyboardShouldPersistTaps='handled'> */}
			<View style={styles.optionsRow}>
				{/* Dropdown */}
				<View style={styles.dropdownContainer}>
					<View style={styles.pickerWrapper}>
						<Text style={styles.pickerLabel}>Select Product Type</Text>
					</View>
					<Picker
						selectedValue={selectedProduct}
						onValueChange={(item, index) => {
							if (item == null) {
								showToast('You have not selected any item.', 'error');
								setSelectedProduct({});
								return;
							} else {
								const { id, name } = item;
								return setSelectedProduct({ id, name });
							}
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

				{/* Quantity Button */}
				<View style={styles.dropdownContainer}>
					<View style={styles.pickerWrapper}>
						<Text style={styles.pickerLabel}>Select Quantity</Text>
					</View>
					<Picker
						selectedValue={selectedQuantity}
						onValueChange={(item, index) => {
							return setSelectedQuantity(item);
						}}
						//onFocus={() => setSelectedQuantity(null)}
						style={styles.picker}
						mode='dropdown'>
						<Picker.Item key={0} label={'Select..'} value={null} />
						{quantityList.map((item, index) => (
							<Picker.Item key={index + 1} label={item.name} value={item.name} />
						))}
					</Picker>
				</View>
			</View>
			{Object.keys(selectedProduct).length > 0 && selectedQuantity !== null ? (
				<CreateInvoiceComponent
					amount={amount}
					setAmount={setAmount}
					payee={payee}
					setPayee={setPayee}
					date={date}
					setDate={setDate}
					submitInvoice={insertInvoice}
					payeeFound={payeeFound}
					setPayeeFound={setPayeeFound}
					goto={goto}
				/>
			) : null}
			{/* </KeyboardAwareScrollView> */}
			<LoadingModal message={'Syncing Data...'} visible={isSyncing} />
		</SafeAreaView>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	innerContainer: { flex: 1 },
	headerImage: {
		width: '100%',
		height: 150,
	},

	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
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
