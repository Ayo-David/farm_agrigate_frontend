import EncryptedStorage from 'react-native-encrypted-storage';

export const addData = async (key: string, values: number | string | object) => {
	try {
		const item = JSON.stringify(values);
		await EncryptedStorage.setItem(key, item);
	} catch (error) {
		return error;
	}
};

export const getData = async (key: string) => {
	try {
		const item = await EncryptedStorage.getItem(key);
		return JSON.parse(item);
	} catch (error) {
		return error;
	}
};

export const clearData = async (key: string) => {
	try {
		EncryptedStorage.clear(key);
		return true;
	} catch (error) {
		return error;
	}
};

export const deleteData = async (key: string) => {
	try {
		await EncryptedStorage.removeItem(key);
		return true;
	} catch (error) {
		return error;
	}
};
