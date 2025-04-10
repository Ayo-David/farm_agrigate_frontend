import database from '@app/database/database';
import { Q } from '@nozbe/watermelondb';
import { BASE_URL, BASE_URL_LOCAL } from '@env';
import { tsToDate } from '@app/helpers/utils';
import api from '@app/helpers/api';

export const getChangedRecords = async (lastSyncTimestamp) => {
	const invoicesCollection = database.get('invoices');

	try {
		// Fetch created/updated records since lastSyncTimestamp
		const changedRecords = await invoicesCollection
			.query(Q.where('created_at', Q.gt(lastSyncTimestamp)))
			.fetch();

		return changedRecords.map((invoice) => {
			return {
				id: invoice.id,
				invoiceNo: invoice.invoiceNo,
				productNo: invoice.productNo,
				txnId: invoice.txnId,
				productId: invoice.productId,
				quantity: invoice.quantity,
				payeeId: invoice.payeeId,
				date: tsToDate(invoice.date),
				amount: invoice.amount,
				status: invoice.status,
				created_at: invoice.createdAt.toISOString(),
				updated_at: invoice.updatedAt.toISOString(),
			};
		});
	} catch (error) {
		console.error('Error fetching changed records:', error);
		return [];
	}
};

export const syncChangesToServer = async (lastSyncTimestamp) => {
	const createdUpdatedRecords = await getChangedRecords(lastSyncTimestamp);
	const changes = {
		invoices: {
			created_updated: createdUpdatedRecords,
		},
	};
	console.log(`changes = `, changes);

	const url = __DEV__ ? BASE_URL : BASE_URL_LOCAL;
	console.log(`url = `, url);
	try {
		const res = await api.post('/syncdata/pushsync', { changes });
		// const res = await fetch(`${url}/syncdata/pushsync`, {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ changes }),
		// }).then(async (response) => {
		// 	const contentType = response.headers.get('content-type');

		// 	if (!contentType || !contentType.includes('application/json')) {
		// 		return response.text();
		// 		//throw new Error('Response is not JSON');
		// 	}

		// 	return response.json();
		// });

		//const res = JSON.parse(response);

		console.log(`res = `, res);

		if (res.data.success) {
			return { success: true, message: 'Changes synced successfully!' };
		} else {
			return { success: false, message: `'Sync failed:', ${await response.text()}` };
		}
	} catch (error) {
		console.log(`error = `, error);
		return { success: false, message: `''Error syncing changes:', ${error}` };
	}
};
