//import from app
import StateClient from './StateClient.js';

class StateHelper {
	constructor() {
		this.stateChangeCallbacks = {
			appDataCallback: [],
		}
		StateClient.on('change:appData', (appData) => {
			this.onAppDataChanged(appData);
		});
	}

	onAppDataChanged = (appData) => {
		let callbacks = this.stateChangeCallbacks.appDataCallback;
		callbacks.forEach(callback => callback(appData));
	}
	setOnAppDataChanged = (callback) => {
		this.stateChangeCallbacks.appDataCallback.push(callback)
	}

	removeAppDataChanged = () => {
		this.stateChangeCallbacks.appDataCallback.pop();
	}
}

const stateHelper = new StateHelper();
export default stateHelper;