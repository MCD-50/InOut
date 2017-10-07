import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';

export default class SignupSection extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.7)' }}>
					<Text style={styles.text}>Request Access</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
		width: DEVICE_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom:20
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
});
