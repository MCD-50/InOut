//import from system
import React, { Component, PropTypes } from 'react';
import { BackAndroid, ListView, Text, View } from 'react-native';
import Fluxify from 'fluxify';

//import from app
import Container from '../../../Container';
import { Toolbar, Card } from 'react-native-material-component';
import styles from '../../constants/AppStyle';
import { resolveRequestNoForm } from '../../helpers/InternetHelper';
import { APP_BASE, } from '../../constants/AppConstant';
import Store from '../../store/StateClient';
import { style } from '../../constants/AppStyle.js';
import { STATUS_BAR_COLOR, PRIMARY_COLOR } from '../../constants/AppColor.js'
import { Page } from '../../enums/Page.js';

const propTypes = {
	navigator: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

class NewsPage extends Component {
	constructor(params) {
		super(params);

		this.state = {
			news: ds.cloneWithRows([]),
		}

		this.sendRequest = this.sendRequest.bind(this);
		this.viewNews = this.viewNews.bind(this);

		this.renderEmptyMessage = this.renderEmptyMessage.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
	}


	componentDidMount() {
		this.sendRequest();
		Store.on('change:news', (news) => {
			this.setState({
				news: ds.cloneWithRows(news.slice())
			});
		});
	}

	sendRequest() {
		resolveRequestNoForm(`${APP_BASE}/scrape`, JSON.stringify({
			"page_number": 1,
			"search_string": "world",
			"language_name": "english"
		})).then(res => {
			const news = res && res.items || [];
			Fluxify.doAction('updateNews', news);
			this.setState({
				news: ds.cloneWithRows(news.slice())
			});
		}).catch(err => {
			console.log(err);
		})
	}

	viewNews(item) {
		const page = Page.NEWS_DETAILS_PAGE;
		const data = {
			item: item,
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
			<Card style={{ minHeight: 50, padding: 10}} fullWidth="1" onPress={() => this.viewNews(item)}>
				<View style={style.main_page_list_item_container}>
					<Text style={style.main_page_header_text}>
						{item.title}
					</Text>
					<Text style={[style.main_page_description_text]}>
						{item.description}
					</Text>
					<Text style={[style.main_page_description_text, { color: PRIMARY_COLOR }]}>
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
					dataSource={this.state.news}
					keyboardShouldPersistTaps='always'
					keyboardDismissMode='interactive'
					enableEmptySections={true}
					ref={'LISTVIEW'}
					renderRow={(item) => this.renderListItem(item)} />

			</Container>
		)
	}
}

NewsPage.propTypes = propTypes;
export default NewsPage;