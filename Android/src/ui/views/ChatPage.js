//import from system
import React, { Component, PropTypes } from 'react';
import { View, BackAndroid, Linking, } from 'react-native';

//import from app
import { Toolbar } from 'react-native-material-component';
import { Page } from '../../enums/Page.js';
import {
	ROOM_NAME, GOING_ID, GOING_NAME
} from '../../constants/AppConstant.js';

import { createChatItem } from '../../helpers/CollectionHelper';

import { style } from '../../constants/AppStyle.js';
import { AirChatUI } from 'react-native-air-chat';
import AlertHelper from '../../helpers/AlertHelper.js';
import Send from '../components/Send.js';
import Container from '../../../Container';
import SocketHelper from '../../helpers/SocketHelper.js';

//socket-io fix
window.navigator.userAgent = "react-native"

const propTypes = {
	navigator: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

const menuItems = ['About'];
class ChatPage extends Component {
	constructor(params) {
		super(params);
		this.socket = null;
		this.state = {
			messages: [],
			hasButton: false,
			link: '',
			buttons: []
		};

		this.renderSend = this.renderSend.bind(this);
		this.onSend = this.onSend.bind(this);
		this.popUp = this.popUp.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
		this.setStateData = this.setStateData.bind(this);
		this.onMessageReceive = this.onMessageReceive.bind(this);
		this.onSocketConnectCallback = this.onSocketConnectCallback.bind(this);
		this.onRoomJoinedCallback = this.onRoomJoinedCallback.bind(this);
	}


	componentDidMount() {
		this.socket = SocketHelper(this.onMessageReceive, this.onSocketConnectCallback, this.onRoomJoinedCallback);
	}

	setStateData(messages) {
		this.setState((previousState) => {
			return {
				messages: AirChatUI.append(previousState.messages, messages),
			};
		});
	}


	onMessageReceive(message) {
		if (typeof message == 'object' && (message.items == undefined || message.items == null)) {
			let options = {link:'', hasButton: false, buttons: []}
			if (message.hasButton) {
				options = {
					link:'', hasButton: true, buttons: ['Show an article']
				}
				this.setState(options);
			}
			this.setStateData(createChatItem(message, options));
		} else if (typeof message == 'object' && (message.items != undefined || message.items != null) && message.items.length > 0) {
			let options = {
				link: message.items[0].url, hasButton: true, buttons: ['View', 'Yup', 'No'],
			};
			
			this.setState(options);
			this.setStateData(createChatItem(message.items[0], options));
		} else if (typeof message == 'string') {
			let options = {
				hasButton: false, buttons: [], link:''
			}
			this.setState(options);
			this.setStateData(createChatItem({ text: message }, options));
		} else {
			let options = {
				hasButton: false, buttons: [], link:''
			}
			this.setState(options);
			this.setStateData(createChatItem({ text: 'Something went wrong.' }, options));
		}
	}

	onSocketConnectCallback() {
		this.socket.joinRoom(ROOM_NAME)
	}

	onRoomJoinedCallback() {
		this.socket.sendMessage('Welcome there.. Currently I"m Running on React Native.');
	}


	renderSend(props) {
		return (<Send {...props } />);
	}

	onSend(messages = []) {
		this.setStateData(messages);
		this.socket.sendMessage(messages[0].text);
	}

	onButtonClick(message, text) {
		if(text.includes("Show an")){

			this.socket.sendMessage("-//ARTICLE");
		}else if(text.includes("View")){
			message.options.link && Linking.openURL(message.options.link);
		}else if(text.includes("Yup")){
			this.socket.sendMessage("-//YUP");
		}else if(text.includes("No")){
			this.socket.sendMessage("-//NO");
		}
	}

	popUp() {
		if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
			this.props.navigator.pop();
			if (this.props.route.data && this.props.route.data.callback) {
				this.props.route.data.callback();
			}
			return true;
		}
		return false;
	}


	render() {
		return (
			<Container>
				<Toolbar
					leftElement="arrow-back"
					onLeftElementPress={() => this.popUp()}
					translucent={true} />

				<AirChatUI
					messages={this.state.messages}
					onSend={this.onSend}
					user={{
						_id: GOING_ID,
						name: GOING_NAME,
					}}
					options={{
						link: '',
						hasButton: false,
						buttons: []
					}}
					onButtonClick={this.onButtonClick}
					keyboardDismissMode='interactive'
					enableEmptySections={true}
					alert={false}
					renderSend={this.renderSend} />
			</Container>
		)
	}
}

ChatPage.propTypes = propTypes;
export default ChatPage;