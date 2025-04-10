import { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
	success: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'green' }}
			text1Style={{ fontSize: 16, fontWeight: 'bold' }}
			text2Style={{ fontSize: 14, color: 'gray' }}
		/>
	),
	error: (props) => (
		<ErrorToast
			{...props}
			style={{ borderLeftColor: 'red' }}
			text1Style={{ fontSize: 16, fontWeight: 'bold' }}
			text2Style={{ fontSize: 14, color: 'gray' }}
		/>
	),
};

export default toastConfig;
