//import from system
import { NetInfo } from 'react-native';

//import from app
import AlertHelper from '../helpers/AlertHelper.js';

export const checkIfNetworkAvailable = () => {
	return NetInfo.isConnected.fetch();
}

// export const login = (username, password) => {
// 	return resolveRequestNoForm(AUTH_URL_BASE + AUTH_URL_LOGIN, JSON.stringify({
// 		username: username,
// 		password: password
// 	}));
// }

// export const signUp = (username, password) => {
// 	return resolveRequestNoForm(AUTH_URL_BASE + AUTH_URL_SIGNUP, JSON.stringify({
// 		username: username,
// 		password: password
// 	}));
// }

// export const pushExpense = (data)=>{
// 	return resolveRequestNoForm(DATABASE_URL_BASE + DATABSE_URL_EXPENSE, JSON.stringify(data));
// }

export const resolveRequestNoForm = (url, data = null) => {
	let form = null
	const method = getMethod(data, true);

	return fetchUrl(url, method)
		.then((res) => {
			return Promise.resolve(res);
		})
		.catch((rej) => {
			return Promise.reject(rej)
		});
}

export const resolveRequest = (url, data = null) => {
	let form = null
	if (data) {
		form = new FormData();
		form.append('obj', JSON.stringify(data));
	}
	const method = getMethod(form);
	return fetchUrl(url, method)
		.then((res) => {
			return Promise.resolve(res);
		})
		.catch((rej) => {
			return Promise.reject(rej)
		});
}

const getMethod = (body = null, isData = false) => {
	if (body) {
		const method = {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: body
		}
		if (isData) {
			method['headers'] = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}
		return method
	} else {
		return {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}
	}
}

const fetchUrl = (url, method) => {
	return checkIfNetworkAvailable()
		.then((r) => {
			if (method) {
				return fetch(url, method)
					.then((res) =>{
						return res.json()
					}, (rej) => Promise.reject(rej))
			}
			return fetch(url).then((res) => {
				return res.json()
			}, (rej) => Promise.reject(rej))
		}, (rej) => {
			showRejectMessage(rej, null);
			return Promise.reject()
		});
}


const showRejectMessage = (rej, message) => {
	if (rej) {
		AlertHelper.showAlert("Network request failed.",
			"Please check your internet connection and try again.")
	} else {
		AlertHelper.showAlert('Network request failed.', message)
	}
}
