import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import User from './models/User';
import Location from './models/Location';
import Product from './models/Product';
import Invoice from './models/Invoice';
import Quantity from './models/Quantity';
import Payee from './models/Payee';
import migrations from './migrations';

const adapter = new SQLiteAdapter({
	schema,
	migrations,
	migrationEvents: true,
});

const database = new Database({
	adapter,
	modelClasses: [User, Location, Product, Invoice, Quantity, Payee],
});

export default database;
