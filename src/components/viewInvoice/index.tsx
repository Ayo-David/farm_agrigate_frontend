import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as ScopedStorage from 'react-native-scoped-storage';
import { getPayeeName } from '@app/services/payeeServices';

import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { showToast, tsToDate } from '@app/helpers/utils';
import { FullWidthButton } from '../button';
import { Navbar } from '../navBar';
import { getData } from '@app/helpers/encryptedStorage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@app/navigation/HomeStack';

type NavigationPropType = NativeStackNavigationProp<HomeStackParamList>;

const ViewInvoiceScreen = ({ route }: NavigationPropType) => {
	const { id, txn_id, invoice_no, product_no, status, quantity, payee_id, date, amount } =
		route.params.item;

	const [payee, setPayee] = useState<string>('');
	const viewShotRef = useRef(null);
	const [saving, setSaving] = useState<boolean>(false);

	const getPayee = async () => {
		const payee = await getPayeeName(payee_id);
		setPayee(payee._raw.full_name);
	};

	const captureAndSaveInvoice = async () => {
		//await requestStoragePermission();
		// if (!hasPermission) {
		// 	Alert.alert('Permission Denied', 'Storage permission is required to save invoices.');
		// 	return;
		// }

		setSaving(true);
		//try {
		const uri = await viewShotRef.current.capture();
		const path = `${RNFS.DownloadDirectoryPath}/invoice_${product_no}.png`;

		await RNFS.copyFile(uri, path);

		let dir = await getData('userMediaDirectory');
		dir = JSON.parse(dir);
		console.log(`dir = `, dir);

		// Get list of persisted Uris
		//const persistedUris = await ScopedStorage.getPersistedUriPermissions();

		// Check if the directory uri exists in the list of uris where we have access to read/write.
		//if (persistedUris.indexOf(dir.uri) !== -1) {
		// If uri is found, we can proceed to write/read data.
		//await ScopedStorage.writeFile(dir.uri, path, 'image/png', imageData, 'base64');
		//} else {
		// We can request for permission again and store the new directory if access has been revoked by user here.
		//const dir = await ScopedStorage.openDocumentTree(true);
		await ScopedStorage.writeFile(dir.uri, path, 'image/png', imageData, 'base64');
		//}

		// We can store this directory in AsyncStorage for later use.
		//await addData('userMediaDirectory', JSON.stringify(dir));
		showToast(`Invoice saved to ${path}`, 'success');
		// } catch (error) {
		// 	console.error('Error saving invoice:', error);
		// 	showToast('Failed to save invoice.', 'error');
		// }
		setSaving(false);
	};

	useEffect(() => {
		getPayee();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header Image */}
			<Navbar title='Invoice' backIcon />
			<Image
				source={require('@assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>
			<ViewShot ref={viewShotRef} style={styles.innerContainer}>
				{/* <Logo style={styles.logo} /> */}
				<Text style={styles.title}>Payment Invoice</Text>

				<View style={styles.row}>
					<Text style={styles.label}>Product No:</Text>
					<Text>{product_no}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Invoice No:</Text>
					<Text>{invoice_no}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Quantity</Text>
					<Text>{quantity}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Date:</Text>
					<Text style={styles.approved}>{tsToDate(date)}</Text>
				</View>

				<Text style={styles.subTitle}>Transaction ID:</Text>
				<Text>${id + txn_id}</Text>

				<Text style={styles.amount}>Amount: {amount}</Text>

				<View style={styles.qrContainer}>
					<QRCode value={product_no} size={80} />
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '100%',
					}}>
					<Text style={styles.agent}>Status: {status}</Text>
					<Text style={styles.agent}>Agent: {payee}</Text>
				</View>
			</ViewShot>
			<FullWidthButton onPress={captureAndSaveInvoice} disabled={saving} title={'Download'} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headerImage: {
		width: '100%',
		height: 150,
	},
	innerContainer: {
		backgroundColor: '#f5f5f5',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
		elevation: 5,
		marginTop: 10,
		marginHorizontal: 15,
		marginBottom: 20,
	},
	logo: {
		width: 30,
		height: 50,
		resizeMode: 'contain',
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 2,
	},
	label: {
		fontWeight: 'bold',
	},
	approved: {
		fontWeight: 'bold',
		color: 'green',
	},
	subTitle: {
		fontWeight: 'bold',
		marginTop: 10,
	},
	amount: {
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 10,
	},
	qrContainer: {
		marginVertical: 10,
	},
	agent: {
		marginTop: 10,
		fontSize: 14,
	},
});

export default ViewInvoiceScreen;
