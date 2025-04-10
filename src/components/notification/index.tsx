import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import SuccessIcon from '@assets/images/success.svg';
import ErrorIcon from '@assets/images/error.svg';
import { FullWidthButton } from '../button';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = ({ route }) => {
	const { type, title, message } = route.params;

	const navigation = useNavigation();

	const onPress = () => {
		return navigation.pop(2);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Header Image */}
			<Image
				source={require('@assets/images/header-image.png')} // Replace with your image path
				style={styles.headerImage}
				resizeMode='cover'
			/>

			<View style={styles.innerContainer}>
				{type == 'error' ? <ErrorIcon /> : <SuccessIcon />}

				<Text style={styles.title}>{title}</Text>
				<Text>{message}</Text>
			</View>
			<View style={styles.btn}>
				<FullWidthButton onPress={onPress} title={'Continue'} />
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

export default NotificationScreen;
