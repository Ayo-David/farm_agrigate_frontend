import React, { FC } from 'react';
import { Platform, View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native';
import { colour } from '@assets/theme/colour';

type InputFieldProps = TextInputProps & {
	//error?: string;
	//touched?: boolean;
	inputLabel?: string;
	icon?: FC;
	onFocus?: boolean;
	field: unknown;
	form: unknown;
};

const InputField = ({ ...props }: InputFieldProps) => {
	const {
		icon: Icon,
		field: { name, onBlur, onChange, value },
		form: { errors, touched, setFieldTouched },
	} = props;
	const hasError = errors[name] && touched[name];
	return (
		<View>
			<View style={[styles.textInputWrapper, hasError && styles.errorInput]}>
				{Icon && (
					<View style={styles.iconLayout}>
						<Icon />
					</View>
				)}
				<TextInput
					{...props}
					autoCorrect={false}
					allowFontScaling={false}
					value={value}
					underlineColorAndroid={'transparent'}
					placeholderTextColor={colors.gray_600}
					onChangeText={(text) => onChange(name)(text)}
					onBlur={() => {
						setFieldTouched(name);
						onBlur(name);
					}}
					style={{
						...styles.inputText,
						borderColor: props.onFocus ? colors.green_100 : colors.green_200,
					}}
				/>
			</View>
			{hasError && (
				<View style={{ paddingBottom: 1 }}>
					<Text style={styles.errorText} text={errors[name]} />
				</View>
			)}
			{/* {error && touched && <Text style={styles.errorText} text={error} />} */}
		</View>
	);
};

const styles = StyleSheet.create({
	textInputWrapper: {
		flexDirection: 'row',
		borderColor: color.gray_border,
		borderWidth: 1,
		height: 6,
		width: '100%',
		borderRadius: 5,
		marginBottom: 2,
		backgroundColor: color.white,
		//padding: wp(4),
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 2,
	},
	iconLayout: {
		paddingRight: 2,
		marginLeft: 6,
	},

	errorText: {
		//...theme.formErrorMessage,
		color: color.red_100,
		//textTransform: 'capitalize',
	},

	inputText: {
		// ...theme.miniText,
		lineHeight: Platform.OS === 'ios' ? 0 : 4,
		color: colour.black,
		width: '100%',
		//marginLeft: wp(2),
		alignContent: 'center',
	},
});

export { InputField };
