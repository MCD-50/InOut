//import from system
import React, { Component, PropTypes } from 'react';
import { BackAndroid, ListView, Text, View } from 'react-native';

//import from app
import Container from '../../../Container';
import { Toolbar, Card } from 'react-native-material-component';
import { style } from '../../constants/AppStyle.js';
import { STATUS_BAR_COLOR, PRIMARY_COLOR, ACCENT_COLOR } from '../../constants/AppColor.js'

import SwipeCards from 'react-native-swipe-cards';



const propTypes = {
	navigator: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

class ProductDetailPage extends Component {
	constructor(params) {
		super(params);
		this.state = {
			items: [this.props.route.data.item]
		}

		this.handleNope = this.handleNope.bind(this);
		this.handleYup = this.handleYup.bind(this);
		this.onPopUp = this.onPopUp.bind(this);

		this.renderNoCard = this.renderNoCard.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
	}

	componentWillMount() {
		this.addBackEvent();
	}

	componentWillUnmount() {
		this.removeBackEvent();
	}

	addBackEvent() {
		BackAndroid.addEventListener('hardwareBackPress', () => {
			this.onPopUp();
		});
	}

	removeBackEvent() {
		BackAndroid.removeEventListener('hardwareBackPress', () => {
			this.onPopUp();
		});
	}

	handleYup(card) {
		console.log(`Yup for ${card.text}`)
	}
	handleNope(card) {
		console.log(`Nope for ${card.text}`)
	}

	onPopUp() {
		if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
			this.props.navigator.pop();
			return true;
		}
		return false;
	}

	renderListItem(item) {
		return (
			<View style={[style.swipeCard, { backgroundColor: ACCENT_COLOR }]}>
				<Text>{item.title}</Text>
				<Text>{item.description}</Text>
			</View>
		)
	}

	renderNoCard() {
		this.onPopUp();
		return null;
	}

	render() {
		return (
			<Container>
				<Toolbar centerElement="Rate News"
					leftElement="arrow-back"
					onLeftElementPress={() => this.onPopUp()} />

				<View style={{ flex:1, paddingBottom: 10, paddingTop:10, paddingLeft:5, paddingRight:5 }}>
					<SwipeCards
						cards={this.state.items}
						renderCard={this.renderListItem}
						renderNoMoreCards={this.renderNoCard}
						handleYup={this.handleYup}
						handleNope={this.handleNope}
					/>
				</View>
			</Container>
		)
	}
}

ProductDetailPage.propTypes = propTypes;
export default ProductDetailPage;