import { CARROT, PETER_RIVER, WISTERIA, ALIZARIN, TURQUOISE, MIDNIGHT_BLUE } from '../constants/AppColor.js';
import { COMING_ID, COMING_NAME } from '../constants/AppConstant';
import { resolveRequest } from './InternetHelper.js';

export const getTextColor = (str) => {
	if (!str) {
		return WISTERIA;
	}
	const array = [CARROT, PETER_RIVER, WISTERIA, ALIZARIN, TURQUOISE, MIDNIGHT_BLUE];
	return array[str.length % array.length];
}

export const capitalize = (str) => {
	if (str) {
		let pieces = str.split(/_| /);
		for (let i = 0; i < pieces.length; i++) {
			let j = pieces[i].charAt(0).toUpperCase();
			pieces[i] = j + pieces[i].substr(1);
		}
		return pieces.join(" ").trim();
	}
	return "Unknown";
}

export const getAvatarText = (title) => {
	if (title == null)
		return 'UN'
	const capitalized = title.toUpperCase()
	if (title.length > 2) {
		return capitalized[0] + capitalized[1];
	}
	return capitalized[0]
}

export const getDateInStringFormat = () => {
	let today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	return getCreatedOn(yyyy + "-" + mm + "-" + dd);
}


const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

const getCreatedOn = (createdOn) => {
	let array = createdOn.split('-');
	let month = months[array[1]];
	return array[2] + ' ' + month + ', ' + array[0];
}


export const getDateTime = () => {
	let today = new Date();
	var dd = today.getDate();
	if (dd.toString().length < 2)
		dd = '0' + dd.toString()
	var mm = parseInt(today.getMonth()) + 1;
	if (mm.toString().length < 2)
		mm = '0' + mm.toString();
	var yyyy = today.getFullYear();
	return yyyy + '-' + mm + '-' + dd + ' ' + parseTime(today.getHours(), today.getMinutes(), today.getSeconds())
}

const parseTime = (hh, mm, ss) => {
	if (hh.toString().length < 2)
		hh = '0' + hh;
	if (mm.toString().length < 2)
		mm = '0' + mm;
	if (ss.toString().length < 2)
		ss = '0' + ss;
	return hh + ':' + mm + ':' + ss;
}

export const createChatItem = (message, options, link = []) => {
	//Date.UTC(2016, 7, 30, 17, 20, 0)
	return [
		{
			_id: Math.round(Math.random() * 1000000),
			text: message.text || message.description || message.title || "Something went wrong.",
			createdAt: new Date(),
			user: {
				_id: COMING_ID,
				name: COMING_NAME,
			},
			alert: false,
			options: options,
			attachments: link,
		},
	];
}