import database from '@app/database/database';
import { Q } from '@nozbe/watermelondb';

const productCollection = database.get('product_services');

export const PRODUCT = {
	listAllProducts: async (productType) => {
		try {
			const productOptions = await productCollection
				.query(Q.where('type', productType)) // Filter where product_type is 'S'
				.fetch()
				.then((products) => products.map((p) => p._raw));

			return productOptions;
		} catch (error) {
			console.error('Error fetching product list', error);
		}
	},
};
