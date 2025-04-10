import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export const formulateSerial = (serial: number) => {
	const nextSerial = serial + 1;
	return nextSerial.toString().padStart(5, 0);
};

export const formulateProductNo = (serial: number) => {
	const nextSerial = serial + 1;
	return nextSerial.toString().padStart(3, 0);
};

export const dateToTimestamp = (date: Date) => new Date(date).getTime();

export const tsToDate = (timestamp: Date) => format(new Date(timestamp), 'yyyy-MM-dd');

export const tsToDateTime = (timestamp: Date) =>
	format(new Date(timestamp), "yyyy-MM-dd'T'HH:mm:ss.SSSX");

export const requestStoragePermission = async () => {
	console.log(`log = great`);
	if (Platform.OS === 'android') {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			return false;
		}
	}
	return true;
};

export const showToast = (text: string, type: string) => {
	Toast.show({
		type: type, // 'success', 'error', 'info'
		text2: text,
		position: 'bottom', // 'top' | 'bottom'
	});
};
