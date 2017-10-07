const express = require('express');
const app = express();
const _http = require('http').Server(app);
const io = require('socket.io')(_http);
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const fs = require('fs');

const BASE = "https://search.wn.com/";
const ACTION = "&action=search&results_type=news&sort_type=-pub-datetime";
const CONNECTION = 'connection';
const MESSAGE = 'message';
const JOIN = 'join';
const LEAVE = 'leave';
const JOINED = 'joined';
const LEFT = 'left';
const ERROR = 'error';

const language_id = {
	"bengali": 42, "chinese": 36, "dutch": 18, "english": 1, "french": 5, "german": 6, "gujarati": 41,
	"hebrew": 48, "hindi": 29, "italian": 2, "japanese": 45, "kannada": 52, "malayalam": 84, "marathi": 49, "nepali": 43, "oriya": 91, "portuguese": 3,
	"punjabi": 50, "russian": 33, "tamil": 31
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

_http.listen(process.env.PORT || 2000);

app.get('/', (req, res) => {
	res.json({
		'url': BASE + '?pagenum=3&action=search&results_type=news&sort_type=-pub-datetime&search_string=india&language_id=29',
	});
});

io.on(CONNECTION, (socket) => {

	socket.on(JOIN, (room_name) => {
		socket.join(room_name);
		io.emit(JOINED, "Joined");
	});

	socket.on(LEAVE, (room_name) => {
		socket.leave(room_name);
		io.emit(LEFT, "Left");
	});

	socket.on(MESSAGE, (message) => {
		console.log(typeof message != 'object');
		if (message && typeof message != 'object') {
			return io.emit(MESSAGE, { text: message });
			return;
		}

		if (message && typeof message == 'object') {
			return getNews(message, (items) => {
				io.emit(MESSAGE, JSON.stringify(items));
			});
		}

		io.emit(MESSAGE, { text: "An error occured try in a bit." });

	});
});


app.post('/scrape', function (req, res) {
	//All the web scraping magic will happen here
	getNews(req.body, (items) => {
		res.json(prepareResponse(items));
	});
})


const getNews = (body, callback) => {
	let pagenum, accept = ACTION, search_string, language_id;
	pagenum = body && body.page_number && "?pagenum=" + body.page_number || "?pagenum=1";
	action = ACTION;
	search_string = body && body.search_string && "&search_string=" + body.search_string || "top news";
	language_id = body && body.language_name && "&language_id=" + getLangId(body.language_name) || 1;

	//request query
	const request_url = BASE + pagenum + action + search_string + language_id;
	//const request_url = BASE + '?pagenum=1&action=search&results_type=news&sort_type=-pub-datetime&search_string=india&language_id=29';

	request(request_url, (error, response, html) => {
		// First we'll check to make sure no errors occurred when making the request
		const items = [];
		if (!error && response.statusCode == 200) {
			// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
			const $html = cheerio.load(response.body);
			$html("div.news-story").each(function (i, e) {
				const title = $html(this).children('div.title').children('a.healine').children().text()
				const author = $html(this).children('div.title').next().text();
				const published_at = $html(this).children('div.summary').prev().text();
				const description = $html(this).children('div.summary').children().text();
				const url = $html(this).children('div.title').next().attr('href')
				items.push({
					title: title,
					author: author,
					published_at: published_at,
					description: description,
					url: url
				});
			});
			callback(items);
		} else {
			callback(items);
		}
	})
}

const getLangId = (lang) => {
	if (!lang) return 1
	lang = lang.toLowerCase().trim();
	const id = language_id[lang] || 1
	return id;
}

const prepareResponse = (items = []) => {
	return { "items": items };
}

