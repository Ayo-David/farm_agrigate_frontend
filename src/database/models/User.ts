import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
	static table = 'users';

	@text('fullname') fullname;
	@text('phone') phone;
	@text('email') email;
	@text('password') password;
	@text('location') location;
}
