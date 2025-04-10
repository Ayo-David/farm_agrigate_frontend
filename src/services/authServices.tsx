import database from '@app/database/database';
import bcrypt from 'bcryptjs';

const saltRounds = 10;
const usersCollection = database.get('users');

export const signUp = async (fullname, phone, email, location, password) => {
	const usersCollection = database.get('users');
	const locations = database.get('locations');
	const products = database.get('product_services');
	const quantities = database.get('quantity_list');

	const existingUser = await usersCollection
		.query()
		.fetch()
		.then((users) => users.find((user) => user.phone === phone));

	if (existingUser) {
		throw new Error('Phone number already exists');
	}

	//const hashedPassword = bcrypt.hashSync(password, saltRounds);
	//seeding some records
	await database.write(async () => {
		await usersCollection.create((user) => {
			user.fullname = fullname;
			user.phone = phone;
			user.email = email;
			user.location = location;
			user.password = password;
		});
	});

	// await database.write(async () => {
	// 	await locations.create((location) => {
	// 		location.name = 'Opa';
	// 	});
	// 	await locations.create((location) => {
	// 		location.name = 'Akpa';
	// 	});
	// 	await locations.create((location) => {
	// 		location.name = 'Edumoga';
	// 	});
	// });

	// await database.write(async () => {
	// 	await products.create((product) => {
	// 		product.type = 'P';
	// 		product.name = 'Cassava Tuber';
	// 	});
	// 	await products.create((product) => {
	// 		product.type = 'S';
	// 		product.name = 'Bagging of Cassava Chips';
	// 	});
	// 	await products.create((product) => {
	// 		product.type = 'S';
	// 		product.name = 'Bagging of Cassava Peel';
	// 	});
	// });

	// await database.write(async () => {
	// 	await quantities.create((quantity) => {
	// 		quantity.type = 'P';
	// 		quantity.name = 'Full Keke';
	// 	});
	// 	await quantities.create((quantity) => {
	// 		quantity.type = 'P';
	// 		quantity.name = 'Half Keke';
	// 	});
	// 	await quantities.create((quantity) => {
	// 		quantity.type = 'P';
	// 		quantity.name = 'Almost Full';
	// 	});
	// 	await quantities.create((quantity) => {
	// 		quantity.type = 'P';
	// 		quantity.name = 'Pick-Up';
	// 	});
	// 	await quantities.create((quantity) => {
	// 		quantity.type = 'P';
	// 		quantity.name = 'Half Pick-Up';
	// 	});
	// 	await quantities.create((quantity) => {
	// 		quantity.type = 'P';
	// 		quantity.name = 'Almost Full Pick-Up';
	// 	});
	// });

	return { success: true };
};

export const login = async (phone, password) => {
	const usersCollection = database.get('users');

	const user = await usersCollection
		.query()
		.fetch()
		.then((users) => users.find((user) => user.phone === phone));

	if (!user) throw new Error('User not found');
	console.log(`password = `, password, user.password);
	if (password != user.password) throw new Error('Authentication failed.');

	return { success: true, user };
};

export const logins = async (phone, password) => {
	const usersCollection = database.get('users');

	const user = await usersCollection
		.query()
		.fetch()
		.then((users) => users.find((user) => user.phone === phone));

	if (!user) {
		throw new Error('User not found');
	}

	const passwordMatch = bcrypt.compareSync(password, user.password);
	if (!passwordMatch) {
		throw new Error('Invalid password');
	}

	return { success: true, user };
};

export const getAllUsers = async () => {
	const allUsers = await usersCollection
		.query()
		.fetch()
		.then((users) => users.map((p) => p._raw));

	if (allUsers.length === 0) throw Error('No user is found, create a new user');
	return allUsers;
};
