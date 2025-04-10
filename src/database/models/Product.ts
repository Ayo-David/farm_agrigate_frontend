import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
	static table = 'product_services';

	@text('type') type;
	@text('name') name;

	// One-to-Many: A Product can have multiple Invoices
	static associations = {
		invoices: { type: 'has_many', foreignKey: 'product_id' },
	};
}
