//import from system
import React, { Component } from 'react';
import { Navigator } from 'react-native';

//import from app
import { ThemeProvider } from 'react-native-material-component';
import { Page } from './src/enums/Page.js';
import { uiTheme } from './src/constants/AppStyle.js';
const UIManager = require('UIManager');

//pages
import SplashPage from './src/ui/views/SplashPage';
import LoginPage from './src/ui/views/LoginPage';

//in home page section
import NewsPage from './src/ui/views/NewsPage';
import NewsDetailsPage from './src/ui/views/NewsDetailPage';
import HistoryPage from './src/ui/views/HistoryPage';

class InOut extends Component {
	constructor(params) {
		super(params);
	}

	componentDidMount() {
		if (UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	renderNavigation(route, navigator) {
		const id = route.id;
		if (id == 1)
			return <SplashPage navigator={navigator} route={route} />
		else if (id == 2)
			return <LoginPage navigator={navigator} route={route} />
		else if (id == 3)
			return <NewsPage navigator={navigator} route={route} />
		else if (id == 4)
			return <NewsDetailsPage navigator={navigator} route={route} />
		else if (id == 5)
			return <HistoryPage navigator={navigator} route={route} />
	}

	render() {
		return (
			<ThemeProvider uiTheme={uiTheme}>
				<Navigator initialRoute={{ id: 1, name: 'Splash' }}
					renderScene={this.renderNavigation.bind(this)}
					configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottomAndroid} />
			</ThemeProvider>
		);
	}
}

export default InOut;