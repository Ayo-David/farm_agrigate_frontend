import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, Button } from 'react-native';

interface LoaderProp {
	visible: boolean;
	message: string;
}
const LoadingModal = ({ visible, message }: LoaderProp) => {
	return (
		<Modal transparent={true} animationType='fade' visible={visible}>
			<View style={styles.modalBackground}>
				<View style={styles.modalContainer}>
					<ActivityIndicator size='large' color='#fff' />
					{message && <Text style={styles.message}>{message}</Text>}
				</View>
			</View>
		</Modal>
	);
};

export default LoadingModal;
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		backgroundColor: '#333',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	message: {
		marginTop: 10,
		color: '#fff',
		fontSize: 16,
	},
});
