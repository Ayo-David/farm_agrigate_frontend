import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import SoonIcon from '@assets/images/comingsoon.svg';

import { Navbar } from '@app/components';

const ComingSoonScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Navbar title={'Coming Soon'} backIcon />
			{/* Header Image */}
			<Image
				source={require('@assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>

			<View style={styles.innerContainer}>
				<SoonIcon />
				<Text style={styles.title}>Coming Soon!</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headerImage: {
		width: '100%',
		height: 150,
	},
	innerContainer: {
		padding: 20,

		alignItems: 'center',

		marginTop: 10,
		marginHorizontal: 15,
		marginBottom: 20,
	},
	logo: {
		width: 30,
		height: 50,
		resizeMode: 'contain',
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 2,
	},
	label: {
		fontWeight: 'bold',
	},
	approved: {
		fontWeight: 'bold',
		color: 'green',
	},
	subTitle: {
		fontWeight: 'bold',
		marginTop: 10,
	},
	amount: {
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 10,
	},
	qrContainer: {
		marginVertical: 10,
	},
	agent: {
		marginTop: 10,
		fontSize: 14,
	},
	btn: {
		width: '100%',
		marginTop: 120,
		alignSelf: 'baseline',
	},
});

export default ComingSoonScreen;
