import { addData, getData } from '@app/helpers/encryptedStorage';
import { HomeStackParamList } from '@app/navigation/HomeStack';
import { syncChangesToServer } from '@app/services/syncServices';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconComponent: React.FC<{ name: string; size: number; color: string }> = Ionicons;

type SyncBarType = {
	setIsSyncing: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigateParams = {
	[K in keyof HomeStackParamList]: {
		screen: K;
		params: HomeStackParamList[K];
	};
}[keyof HomeStackParamList];

type NavigationPropType = NavigationProp<HomeStackParamList>;

const useTypeNavigation = () => {
	const navigation = useNavigation<NavigationPropType>();
	const navigate = <T extends keyof HomeStackParamList>(
		screen: T,
		params: HomeStackParamList[T],
	) => {
		return navigation.navigate(screen, params);
	};
	return { navigate };
};

export const SyncBar = ({ setIsSyncing }: SyncBarType) => {
	//const [lastSyncDate, setlastSyncDate] = useState('');

	//const navigation = useNavigation<NavigationPropType>();

	const { navigate } = useTypeNavigation();

	const goto = (params: NavigateParams) => {
		return navigate(params.screen, params.params);
	};

	const syncData = async () => {
		setIsSyncing(true);

		// const lastUpdate = await getData('lastSyncTimestamp');
		// setlastSyncDate(lastUpdate);
		// //const newDate = tsToDate(lastUpdate);
		// console.log(`first lastUpdate = `, lastUpdate);
		//await clearData('lastSyncTimestamp');
		try {
			let lastUpdate = '';
			lastUpdate = await getData('lastSyncTimestamp');

			console.log(`first lastUpdate = `, lastUpdate);

			if (!lastUpdate) {
				await addData('lastSyncTimestamp', Date.now()); //exactly same as line 30
				lastUpdate = await getData('lastSyncTimestamp');
			}

			//const convert = tsToDateTime(new Date(1743797077666)); //to convert timestamp to date
			//console.log(`convertaaaaaaa = `, convert);
			//const lastUpdate = new Date('2025-04-04T13:38:04.508Z').getTime();

			console.log(`lastUpdateeeeeeeeee = `, lastUpdate);

			//console.log(`after lastUpdate = `, tsToDateTime(lastUpdate));

			const responce = await syncChangesToServer(lastUpdate);
			if (responce.success) {
				setIsSyncing(false);
				await addData('lastSyncTimestamp', Date.now()); //Date.now() automatically returns a timestamp
				goto({
					screen: 'NotificationScreen',
					params: {
						message: 'Records suceessfully synced online',
						type: 'success',
						title: 'Records Synced Successfully!',
					},
				});

				console.log(`Syncing Data `, responce.message);
			} else {
				setIsSyncing(false);
				goto({
					screen: 'NotificationScreen',
					params: {
						message: 'Check your Network and try again later.',
						type: 'error',
						title: 'Error Syncing Data!',
					},
				});
			}
		} catch (error) {
			console.log(`errorsss = `, error);
			setIsSyncing(false);
			goto({
				screen: 'NotificationScreen',
				params: {
					message: 'Check your Network and try again later.',
					type: 'error',
					title: 'Error Syncing Data!',
				},
			});
			console.log(`Failed to sync data = `, error);
		}
	};

	return (
		<View style={styles.headerRow}>
			<TouchableOpacity style={styles.syncButton} onPress={() => syncData()}>
				<IconComponent name={'sync'} size={14} color='#900' />
				<Text style={styles.syncText}>Sync Data</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 10,
	},
	syncButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	syncIcon: {
		width: 20,
		height: 20,
		marginRight: 5,
	},
	syncText: {
		fontSize: 12,
		marginHorizontal: 10,
		color: '#007AFF',
	},
});
