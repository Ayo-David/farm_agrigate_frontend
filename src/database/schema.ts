import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
	version: 3,
	tables: [
		tableSchema({
			name: 'users',
			columns: [
				{ name: 'fullname', type: 'string' },
				{ name: 'email', type: 'string' },
				{ name: 'phone', type: 'string', isIndexed: true },
				{ name: 'password', type: 'string' },
				{ name: 'location', type: 'string' },
			],
		}),
		tableSchema({
			name: 'payee',
			columns: [
				{ name: 'full_name', type: 'string' },
				{ name: 'phone', type: 'string' },
				{ name: 'address', type: 'string' },
				{ name: 'categories', type: 'string' },
				{ name: 'gender', type: 'string' },
				{ name: 'location_id', type: 'number', isIndexed: true },
				{ name: 'created_at', type: 'number' },
				{ name: 'updated_at', type: 'number' },
			],
		}),

		tableSchema({
			name: 'invoices',
			columns: [
				{ name: 'invoice_no', type: 'string' },
				{ name: 'product_no', type: 'string' },
				{ name: 'txn_id', type: 'string' },
				{ name: 'product_id', type: 'string' },
				{ name: 'quantity', type: 'string' },
				{ name: 'payee_id', type: 'string', isIndexed: true },
				{ name: 'date', type: 'number' },
				{ name: 'amount', type: 'string' },
				{ name: 'status', type: 'string' },
				{ name: 'created_at', type: 'number' },
				{ name: 'updated_at', type: 'number' },
			],
		}),
		tableSchema({
			name: 'product_services',
			columns: [
				{ name: 'type', type: 'string' },
				{ name: 'name', type: 'string' },
			],
		}),
		tableSchema({
			name: 'quantity_list',
			columns: [
				{ name: 'type', type: 'string' },
				{ name: 'name', type: 'string' },
			],
		}),
		tableSchema({
			name: 'locations',
			columns: [{ name: 'name', type: 'string' }],
		}),
	],
});
