import database from '@app/database/database';
import { PayeeType } from '@app/interfaces';

const payeeCollection = database.get('payee');

export const createPayee = async (data: PayeeType) => {
	console.log(`payee = `, data);
	const getPayee = payeeCollection
		.query()
		.fetch()
		.then((payees) => payees.find((payee) => payee.phone === data.phone));

	if (getPayee.length > 0) throw Error('Payee already exist!');

	await database.write(async () => {
		await payeeCollection.create((payee) => {
			payee.fullName = data.fullName;
			payee.phone = data.phone;
			payee.address = data.address;
			payee.categories = data.category;
			payee.gender = data.gender;
			payee.locationId = data.location;
		});
	});

	return { success: true };
};

export const getAllPayee = async () => {
	const allPayee = await payeeCollection
		.query()
		.fetch()
		.then((payees) => payees.map((p) => p._raw));

	if (allPayee.length === 0) throw Error('No payee is found, create a new payee');
	return allPayee;
};

export const getPayeeName = async (payeeId: string) => {
	try {
		const payeeName = await payeeCollection.find(payeeId);
		return payeeName;
	} catch (error) {
		console.error('Error fetching payee name', error);
	}
};
