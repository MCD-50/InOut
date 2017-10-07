//import from system
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Linking, ScrollView, StatusBar } from 'react-native';

//import from app
import { Progress, Toast, Icon } from 'react-native-material-component';
import { login, signUp } from '../../helpers/InternetHelper.js';
import { setData, getData } from '../../helpers/AsyncStore.js';
import { APP_INFO } from '../../constants/AppConstant.js';
import { style } from '../../constants/AppStyle.js';
import { STATUS_BAR_COLOR } from '../../constants/AppColor.js'
import { Page } from '../../enums/Page.js';

import Logo from '../components/login/Logo';
import Form from '../components/login/Form';
import Wallpaper from '../components/login/Wallpaper';
import ButtonSubmit from '../components/login/ButtonSubmit';
import SignupSection from '../components/login/SignupSection';

import AlertHelper from '../../helpers/AlertHelper.js';

const propTypes = {
	navigator: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

const defaultProps = {
	text: '',
	placeholder: 'Text...',
	placeholderTextColor: '#b2b2b2',
	multiline: false,
	autoFocus: false,
};


class LoginPage extends Component {
	constructor(params) {
		super(params);
		this.state = {
			email: '',
			password: '',
			progress: false
		};
		this.onButtonClicked = this.onButtonClicked.bind(this);
		this.renderSignInLoading = this.renderSignInLoading.bind(this);
	}

	componentDidMount() {
		const page = Page.HOME_PAGE;
		//this.props.navigator.replace({ id: page.id, name: page.name })
	}

	onButtonClicked() {
		this.setState({ progress: true });
		if (this.isNotEmpty()) {
			const { email, password } = this.state;
			signUp(email, password)
				.then(res => {
					if (res && res.message && res.message == 'Password too short') {
						AlertHelper.showAlert('Error', 'Password too short');
					} else if (res && res.code && res.code == 'user-already-exists') {
						login(email, password)
							.then(_res => {
								if (_res) {
									setData(APP_INFO, JSON.stringify({
										email,
										password,
										hasura_id: _res.hasura_id,
										auth_token: _res.auth_token
									}));
									const page = Page.HOME_PAGE;
									this.props.navigator.replace({ id: page.id, name: page.name })
								}
							}).catch(rej => console.log(rej))
					} else if (res && res.hasura_id) {
						setData(APP_INFO, JSON.stringify({
							email,
							password,
							hasura_id: res.hasura_id,
							auth_token: res.auth_token
						}));
						const page = Page.HOME_PAGE;
						this.props.navigator.replace({ id: page.id, name: page.name })
					} else if (res && res.message && res.message == 'Already logged in. Logout to create new user.') {
						AlertHelper.showAlert('Error', 'Password too short', (__) => {
							if (__.Ok) {
								const page = Page.HOME_PAGE;
								this.props.navigator.replace({
									id: page.id, name: page.name,
								})
							}
						});
					}
				});
		} else {
			AlertHelper.showAlert("Something went wrong.", "Please fill in all the details");
		}
	}


	isNotEmpty() {
		let state = this.state;
		const { email, password } = this.state;
		if (email && password && email.trim().length > 0 && password.trim().length > 0)
			return true;
		return false;
	}

	onType(text, whichState) {
		if (whichState == 1) {
			this.setState({ email: text });
		} else if (whichState == 2) {
			this.setState({ password: text });
		}
	}

	renderSignInLoading() {
		if (this.state.progress) {
			return (
				<View style={style.progress_ring_centered_view}>
					<Progress />
				</View>
			)
		}
		return null;
	}

	render() {
		return (
			<Wallpaper>
				<StatusBar backgroundColor='black' barStyle='light-content' />
				<ScrollView style={style.container_with_flex_1} keyboardDismissMode='interactive'>
					<View style={style.view_with_flex_1_and_margin_all_sides}>
						<Logo />
						<Form />
						<ButtonSubmit />
						<SignupSection />
					</View>
				</ScrollView>
			</Wallpaper>
		);
	}
}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;
export default LoginPage;