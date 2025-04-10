import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import ToolIcon from '@assets/images/toolsIcon.svg';
import RecordIcon from '@assets/images/recordIcon.svg';
import HarvestIcon from '@assets/images/harvestIcon.svg';
import BillIcon from '@assets/images/billIcon.svg';
import AddIcon from '@assets/images/addIcon.svg';
import { Navbar } from '@app/components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@app/navigation/HomeStack';

type GotoParamsType = {
	[K in keyof HomeStackParamList]: {
		screen: K;
		param: HomeStackParamList[K];
	};
}[keyof HomeStackParamList];

type NavigationPropType = {
	navigation: NativeStackNavigationProp<HomeStackParamList>;
};

const HomeScreen = ({ navigation }: NavigationPropType) => {
	const goto = (args: GotoParamsType) => navigation.navigate(args.screen, args.param);

	return (
		<SafeAreaView style={styles.container}>
			<Navbar
				title={'Home'}
				//backIcon
				// RightIcon={GearIcon}
				// onRightPress={onIconPress}
			/>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Header Image */}
				<Image
					source={require('../../assets/images/header-image.png')} // Replace with your image path
					style={styles.headerImage}
					resizeMode='cover'
				/>

				{/* Grid Buttons */}
				<View style={styles.gridContainer}>
					{/* Button 1 */}
					<TouchableOpacity
						style={styles.gridButton}
						onPress={() => goto({ screen: 'RegisterFarmersScreen', param: undefined })}>
						<AddIcon />
						<Text style={styles.buttonText}>Registration</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.gridButton}
						onPress={() =>
							goto({ screen: 'ProductScreen', param: { productType: 'P' } })
						}>
						<HarvestIcon />
						<Text style={styles.buttonText}>Product</Text>
					</TouchableOpacity>

					{/* Button 2 */}
					<TouchableOpacity
						style={styles.gridButton}
						onPress={() =>
							goto({ screen: 'ProductScreen', param: { productType: 'S' } })
						}>
						<ToolIcon />
						<Text style={styles.buttonText}>Services</Text>
					</TouchableOpacity>

					{/* Button 3 */}
					<TouchableOpacity
						style={styles.gridButton}
						onPress={() => goto({ screen: 'InvoicesScreen', param: undefined })}>
						<BillIcon />
						<Text style={styles.buttonText}>Invoice</Text>
					</TouchableOpacity>

					{/* Button 4 */}

					{/* Button 5 */}
					<TouchableOpacity
						style={styles.gridButton}
						onPress={() => goto({ screen: 'ComingSoonScreen', param: undefined })}>
						<RecordIcon />
						<Text style={styles.buttonText}>Records</Text>
					</TouchableOpacity>

					{/* Button 6 */}
					<TouchableOpacity
						style={styles.gridButton}
						onPress={() => goto({ screen: 'ComingSoonScreen', param: undefined })}>
						<ToolIcon />
						<Text style={styles.buttonText}>Settings</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	headerImage: {
		width: '100%',
		height: 150,
	},
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 20,
		paddingHorizontal: 10,
	},
	gridButton: {
		width: '40%',
		height: 120,
		backgroundColor: '#F8F8F8',
		margin: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 3,
	},
	icon: {
		width: 40,
		height: 40,
		marginBottom: 10,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
});
