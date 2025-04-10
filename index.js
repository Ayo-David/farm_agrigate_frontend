/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Provider from './src/context';

const Persist = () => {
	return (
		<Provider>
			<App />
		</Provider>
	);
};

AppRegistry.registerComponent(appName, () => Persist);
