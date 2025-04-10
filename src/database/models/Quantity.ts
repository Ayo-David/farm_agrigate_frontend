import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Quantity extends Model {
	static table = 'quantity_list';

	@text('type') type;
	@text('name') name;
}
