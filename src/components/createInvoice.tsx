import { showToast } from '@app/helpers/utils';
import { PayeeType } from '@app/interfaces';
import { getAllPayee } from '@app/services/payeeServices';
import { colour } from '@assets/theme/colour';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';

const CreateInvoiceComponent: React.FC = ({
	payee,
	setPayee,
	amount,
	setAmount,
	date,
	setDate,
	submitInvoice,
	payeeFound,
	setPayeeFound,
	goto,
}) => {
	//const [date, setDate] = useState();
	const [open, setOpen] = useState<boolean>(false);
	const [filteredPayee, setFilteredPayee] = useState<PayeeType[]>([]);
	const [allPayee, setAllPayee] = useState<PayeeType[]>([]);

	const fetchAllPayee = async () => {
		const payeeList = await getAllPayee();
		setAllPayee(payeeList);
	};

	const handleChange = (text: string) => {
		setPayee({ full_name: text });
		searchPayee(text);
	};

	const handleBlur = () => {
		if (!payeeFound) {
			showToast(
				`${payee.full_name} is not found. Click on Add Payee \nto create it`,
				'error',
			);
		}
		setFilteredPayee([]);
	};

	const searchPayee = (text: string) => {
		const search = allPayee.filter((payee: PayeeType) => {
			const name = payee.full_name;
			return name.toLowerCase().indexOf(text.toLowerCase()) > -1;
		});

		setFilteredPayee(search);
		setPayeeFound(false);
	};

	const handleSelect = (id: string, full_name: string) => {
		setPayee({ id, full_name });
		setPayeeFound(true);
		setFilteredPayee([]);
		//handleBlur();
	};

	useEffect(() => {
		fetchAllPayee();
	}, []);

	return (
		<View style={styles.container}>
			{/* Form Section */}
			<View style={styles.formContainer}>
				{/* Payee Input */}
				<TextInput
					style={styles.input}
					placeholder='Payee'
					placeholderTextColor='#B0B0B0'
					value={payee.full_name}
					onChangeText={handleChange}
					onBlur={handleBlur}
				/>
				<View>
					<FlatList
						data={filteredPayee}
						keyExtractor={(item) => item.id}
						style={styles.payeeList}
						keyboardShouldPersistTaps='handled'
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									key={item.id}
									onPress={() => handleSelect(item.id, item.full_name)}>
									<Text style={styles.listItem}>{item.full_name}</Text>
								</TouchableOpacity>
							);
						}}
					/>
				</View>

				{/* Add Payee Button */}
				<TouchableOpacity
					style={styles.addPayeeButton}
					onPress={() => goto('RegisterFarmersScreen')}>
					<Text style={styles.addPayeeText}>Add Payee</Text>
				</TouchableOpacity>
				{/* Amount Input */}
				<TextInput
					style={styles.input}
					placeholder='Amount'
					placeholderTextColor='#B0B0B0'
					keyboardType='numeric'
					value={amount}
					autoCorrect={false}
					autoComplete='off'
					onChangeText={setAmount}
				/>
				{/* Date Input */}
				<TextInput
					style={styles.input}
					placeholder='2000-01-01'
					placeholderTextColor='#B0B0B0'
					onPress={() => setOpen(true)}
					value={format(date, 'yyyy-MM-dd')}
				/>

				<DatePicker
					modal
					open={open}
					date={date}
					mode='date'
					onConfirm={(date) => {
						setOpen(false);
						setDate(date);
					}}
					onCancel={() => {
						setOpen(false);
					}}
				/>

				{/* Submit Button */}
				<TouchableOpacity style={styles.submitButton} onPress={submitInvoice}>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CreateInvoiceComponent;

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
	payeeList: { backgroundColor: colour.white, marginTop: -17, marginBottom: 5 },
	listItem: { padding: 10 },
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
	selectPayee: {
		zIndex: 200,
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
