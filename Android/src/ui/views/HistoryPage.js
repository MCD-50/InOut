//import from system
import React, { Component, PropTypes } from 'react';
import { BackAndroid, ListView, Text, View } from 'react-native';

//import from app
import Container from '../../../Container';
import { Toolbar } from 'react-native-material-component';
import styles from '../../constants/AppStyle';
import { resolveRequestNoForm } from '../../helpers/InternetHelper';
import { APP_BASE } from '../../constants/AppConstant';
import { Page } from '../../enums/Page';
import Store from '../../store/StateClient';

const propTypes = {
	navigator: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

class HistoryPage extends Component {
	constructor(params) {
		super(params);

		this.state = {
			news: ds.cloneWithRows([]),
		}

		this.sendRequest = this.sendRequest.bind(this);
		this.onPopUp = this.onPopUp.bind(this);
		this.viewNews = this.viewNews.bind(this);

		this.renderEmptyMessage = this.renderEmptyMessage.bind(this);
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
			this.popUp();
		});
	}

	removeBackEvent() {
		BackAndroid.removeEventListener('hardwareBackPress', () => {
			this.onPopUp();
		});
	}


	onPopUp() {
		if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
			this.props.navigator.pop();
			return true;
		}
		return false;
	}

	sendRequest() {
		resolveRequestNoForm(`${APP_BASE}/history`, {
			"personId": "smbdnkjvdfnbfdbdfb",
		}).then(res => {
			const news = res && res.items || [];
			let newsList = this.state.news
			this.setState({
				news: ds.cloneWithRows(notes.slice())
			});
		})
	}

	viewNews(item) {
		const page = Page.NEWS_DETAILS_PAGE;
		const data = {
			item: item,
			textSize: size ? size : 16,
		};
		this.props.navigator.push({ id: page.id, name: page.name, data: data })
	}

	renderEmptyMessage() {
		if (this.state.news.length < 1) {
			return (
				<Text style={[styles.main_page_description_text, { fontSize: 15, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }]}>
					Its empty here. No news found.
				</Text>
			);
		} else {
			return null;
		}
	}


	renderListItem(item) {
		return (
			<Card style={{ minHeight: 50, paddingTop: 10, paddingBottom: 10 }} fullWidth="1" onPress={() => this.viewNews(item)}>
				<View style={styles.main_page_list_item_container}>
					<Text style={styles.main_page_header_text}>
						{item.title}
					</Text>
					<Text style={[styles.main_page_description_text]}>
						{item.description}
					</Text>
					<Text style={[styles.main_page_description_text, { color: PRICOLOR }]}>
						{item.author}
						{item.pusblished_at}
					</Text>
				</View>
			</Card>
		);
	}

	render() {
		return (
			<Container>
				<Toolbar centerElement="News" />

				{this.renderEmptyMessage()}

				<ListView
					dataSource={this.state.dataSource}
					keyboardShouldPersistTaps='always'
					keyboardDismissMode='interactive'
					enableEmptySections={true}
					ref={'LISTVIEW'}
					renderRow={(item) => this.renderListItem(item)} />

			</Container>
		)
	}
}

HistoryPage.propTypes = propTypes;
export default HistoryPage;