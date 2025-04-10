import database from '@app/database/database';

const quantityCollection = database.get('quantity_list');

export const QUANTITY = {
	listAllQuantity: async () => {
		try {
			const quantityList = await quantityCollection
				.query() // Filter where product_type is 'S'
				.fetch()
				.then((quantity) => quantity.map((q) => q._raw));

			return quantityList;
		} catch (error) {
			console.error('Error fetching quantity list', error);
		}
	},
};
