import database from '@app/database/database';

const LOCATION = {
	getLocation: async () => {
		const locationCollection = database.get('locations');
		try {
			return await locationCollection
				.query()
				.fetch()
				.then((item) => item?.map((l) => l._raw));
		} catch (error) {
			console.error('Error while fetching location', error);
		}
	},
};

export default LOCATION;
