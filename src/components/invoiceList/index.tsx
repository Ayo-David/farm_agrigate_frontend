import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type Invoice = {
	id: string;
	number: string;
	status: 'Approved' | 'Disapproved' | 'Pending' | 'Approve';
};

const getStatusStyle = (status: string) => {
	switch (status) {
		case 'Approved':
		case 'Approve':
			return styles.approved;
		case 'Disapproved':
			return styles.disapproved;
		case 'Pending':
			return styles.pending;
		default:
			return {};
	}
};

const InvoiceList = ({ invoiceList, goto }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Invoice List</Text>
				<Text style={styles.headerText}>Status</Text>
			</View>

			<FlatList
				data={invoiceList}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.row}
						onPress={() => goto('ViewInvoiceScreen', { item })}>
						<View style={styles.invoiceItem}>
							<Text style={styles.productNoText}>{item.product_no}</Text>
							<Text style={styles.invoiceNoText}>{item.invoice_no}</Text>
						</View>
						<View style={[styles.statusButton, getStatusStyle(item.status)]}>
							<Text style={styles.statusText}>{item.status}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		padding: 10,
		borderRadius: 10,
		marginHorizontal: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5,
	},
	invoiceItem: {
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	productNoText: {
		marginLeft: 10,
	},
	invoiceNoText: {
		marginLeft: 10,
		fontSize: 10,
	},
	statusButton: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	statusText: {
		color: 'white',
		fontWeight: 'bold',
	},
	approved: {
		backgroundColor: 'green',
	},
	disapproved: {
		backgroundColor: 'red',
	},
	pending: {
		backgroundColor: 'blue',
	},
});

export default InvoiceList;
