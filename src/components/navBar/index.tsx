import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StyleProp,
	ViewStyle,
	StatusBar,
} from 'react-native';

import BackIcon from '@assets/images/backIcon.svg';
import BlankIcon from '@assets/images/leftwhiteIcon.svg';

import { colour } from '@assets/theme/colour';

type NavbarProps = {
	title?: string;
	style?: StyleProp<ViewStyle>;
	RightIcon?: unknown;
	onRightPress?: () => void;
	backIcon?: boolean;
};

export const Navbar = ({ backIcon, title, style, RightIcon, onRightPress }: NavbarProps) => {
	const navigation = useNavigation();

	const navigateToHome = () => {
		return navigation.goBack();
	};

	return (
		<View style={[styles.container, style]}>
			<StatusBar
				animated={true}
				backgroundColor={colour.white}
				barStyle={'dark-content'}
				//barStyle={statusBarStyle}
				// showHideTransition={statusBarTransition}
				// hidden={hidden}
			/>
			<View style={styles.wrapper}>
				{backIcon ? (
					<TouchableOpacity style={{ margin: 5, zIndex: 30 }} onPress={navigateToHome}>
						<BackIcon />
					</TouchableOpacity>
				) : null}
				<View>
					<Text style={styles.headerText}>{title}</Text>
				</View>
				{RightIcon ? (
					<TouchableOpacity onPress={onRightPress}>
						<RightIcon />
					</TouchableOpacity>
				) : (
					<View>
						<BlankIcon />
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 45,
		paddingHorizontal: 8,
		paddingTop: 12,
	},
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	headerText: {
		fontSize: 18,
		color: colour.black,
	},
});
