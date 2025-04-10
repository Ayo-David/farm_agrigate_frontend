import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Location extends Model {
	static table = 'locations';

	@text('name') name;

	// Define the one-to-many relationship (Payees belong to a Location)
	static associations = {
		payee: { type: 'has_many', foreignKey: 'location_id' },
	};
}
