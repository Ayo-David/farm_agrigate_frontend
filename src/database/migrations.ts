import { addColumns, createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
	migrations: [
		{
			toVersion: 3,
			steps: [
				addColumns({
					table: 'invoices',
					columns: [{ name: 'status', type: 'string', isOptional: true }],
				}),
			],
		},
	],
});
