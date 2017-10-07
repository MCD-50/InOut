//import from system
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';


//import from app
import InOut from './InOut.js';
import Container from './Container.js';

class InOutApp extends Component {
	render() {
		return (<Container><InOut /></Container>);
	}
}
AppRegistry.registerComponent('kick', () => InOutApp);