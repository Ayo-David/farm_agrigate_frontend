import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly, relation } from '@nozbe/watermelondb/decorators';

export default class Payee extends Model {
	static table = 'payee';

	@text('full_name') fullName;
	@text('email') email;
	@text('address') address;
	@text('categories') categories;
	@text('gender') gender;
	@field('location_id') locationId;

	@readonly @date('created_at') createdAt;
	@readonly @date('updated_at') updatedAt;

	// Define the many-to-one relationship (Each Payee belongs to one Location)
	@relation('locations', 'location_id') location;

	static associations = {
		locations: { type: 'belongs_to', key: 'location_id' },
		invoices: { type: 'has_many', foreignKey: 'invoice_id' },
	};
}
