import database from '@app/database/database';
import { formulateProductNo, formulateSerial } from '@app/helpers/utils';
import { InvoiceType } from '@app/interfaces';
import { Q } from '@nozbe/watermelondb';

const invoiceCollections = database.get('invoices');

export const INVOICE = {
	postInvoice: async ({
		payeeId,
		quantity,
		amount,
		date,
		invoiceNo,
		productNo,
		txnID,
		productId,
	}: InvoiceType) => {
		try {
			await database.write(async () => {
				await invoiceCollections.create((invoice) => {
					invoice.invoiceNo = invoiceNo;
					invoice.productNo = productNo;
					invoice.txnId = txnID;
					invoice.productId = productId;
					invoice.quantity = quantity;
					invoice.payeeId = payeeId;
					invoice.date = date;
					invoice.amount = amount;
					invoice.status = 'Pending';
				});
			});
			return { success: true, message: 'Invoice successfully created' };
		} catch (error) {
			console.error('Error creating invoice', error);
		}
	},
	getAllInvoices: async () => {
		try {
			const invoicesList = await invoiceCollections
				.query(Q.sortBy('created_at', Q.desc))
				.fetch()
				.then((items) => items.map((item) => item._raw));
			return invoicesList;
		} catch (error) {
			console.error('Error fetching Invoices', error);
		}
	},
	getSerial: async () => {
		const lastSerial = await invoiceCollections.query().fetchCount();
		const serialNUmber = '00001';
		if (lastSerial === 0) {
			return serialNUmber;
		} else {
			return formulateSerial(lastSerial);
		}
	},
	getProductNo: async () => {
		const lastSerial = await invoiceCollections.query().fetchCount();
		const serialNUmber = '00001';
		if (lastSerial === 0) {
			return serialNUmber;
		} else {
			return formulateProductNo(lastSerial);
		}
	},

	deleteInvoice: async (invoiceId: string) => {
		await database.write(async () => {
			const invoice = await invoiceCollections.find(invoiceId);
			await invoice.markAsDeleted(); // Soft delete (can be recovered)
		});

		console.log(`Invoice ${invoiceId} marked as deleted.`);
	},
};
