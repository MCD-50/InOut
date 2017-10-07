import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet, KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from 'react-native';

import UserInput from './UserInput';
import SignupSection from './SignupSection';

import usernameImg from '../../../res/images/username.png';
import passwordImg from '../../../res/images/password.png';
import eyeImg from '../../../res/images/eye_black.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			press: false,
		};
		this.showPass = this.showPass.bind(this);
	}

	showPass() {
		this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
	}

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<UserInput source={usernameImg}
					placeholder='Username'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} />

				<UserInput source={passwordImg}
					secureTextEntry={this.state.showPass}
					placeholder='Password'
					returnKeyType={'done'}
					autoCapitalize={'none'}
					autoCorrect={false} />
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
