import { colour } from '@assets/theme/colour';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ButtonType = {
	onPress: () => void;
	disabled?: boolean;
	title: string;
};

const FullWidthButton = ({ onPress, disabled, title }: ButtonType) => {
	return (
		<View style={styles.btnContainer}>
			<TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
				<Text style={styles.btnText}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '90%',
		backgroundColor: colour.green,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	btnText: {
		color: colour.white,
		fontSize: 16,
		marginVertical: 10,
	},
	btnContainer: { justifyContent: 'center', alignItems: 'center' },
});

export { FullWidthButton };
