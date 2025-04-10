import database from './database';

const seedDatabase = async () => {
	const locations = database.get('locations');
	const products = database.get('product_services');
	const quantities = database.get('quantity_list');

	const existingLocations = await locations.query().fetch();
	const existingProducts = await products.query().fetch();
	const existingQuantity = await quantities.query().fetch();

	if (existingLocations.length == 0) {
		await database.write(async () => {
			await locations.create((location) => {
				location.name = 'Opa';
			});
			await locations.create((location) => {
				location.name = 'Akpa';
			});
			await locations.create((location) => {
				location.name = 'Edumoga';
			});
		});
	}

	if (existingProducts.length == 0) {
		await database.write(async () => {
			await products.create((product) => {
				product.type = 'P';
				product.name = 'Cassava Tuber';
			});
			await products.create((product) => {
				product.type = 'S';
				product.name = 'Bagging of Cassava Chips';
			});
			await products.create((product) => {
				product.type = 'S';
				product.name = 'Bagging of Cassava Peel';
			});
		});
	}

	if (existingQuantity.length == 0) {
		await database.write(async () => {
			await quantities.create((quantity) => {
				quantity.type = 'P';
				quantity.name = 'Full Keke';
			});
			await quantities.create((quantity) => {
				quantity.type = 'P';
				quantity.name = 'Half Keke';
			});
			await quantities.create((quantity) => {
				quantity.type = 'P';
				quantity.name = 'Almost Full';
			});
			await quantities.create((quantity) => {
				quantity.type = 'P';
				quantity.name = 'Pick-Up';
			});
			await quantities.create((quantity) => {
				quantity.type = 'P';
				quantity.name = 'Half Pick-Up';
			});
			await quantities.create((quantity) => {
				quantity.type = 'P';
				quantity.name = 'Almost Full Pick-Up';
			});
		});
	}
};

export default seedDatabase;
