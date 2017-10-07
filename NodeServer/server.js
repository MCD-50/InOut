const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const fs = require('fs');


const BASE = "https://search.wn.com/";
const ACTION = "&action=search&results_type=news&sort_type=-pub-datetime";


const language_id = {
	"bengali": 42, "chinese": 36, "dutch": 18, "english": 1, "french": 5, "german": 6, "gujarati": 41,
	"hebrew": 48, "hindi": 29, "italian": 2, "japanese": 45, "kannada": 52, "malayalam": 84, "marathi": 49, "nepali": 43, "oriya": 91, "portuguese": 3,
	"punjabi": 50, "russian": 33, "tamil": 31
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.listen(process.env.PORT || 2000);

app.get('/', (req, res) => {
	res.json({
		'url': BASE + '?pagenum=3&action=search&results_type=news&sort_type=-pub-datetime&search_string=india&language_id=29',
	});
});


app.post('/scrape', function (req, res) {
	//All the web scraping magic will happen here
	const body = req.body;
	//build query
	const pagenum = "?pagenum=" + body.page_number || "?pagenum=1";
	const action = ACTION;
	let search_string = "&search_string=" + body.search_string || "top news";
	const language_id = "&language_id=" + get_lang_id(body.language_name)

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
			res.json(prepare_response(items));
		} else {
			res.json(prepare_response(items));
		}
	})

})

const get_lang_id = (lang) => {
	if (!lang) return 1
	lang = lang.toLowerCase().trim();
	const id = language_id[lang] || 1
	return id;
}

const prepare_response = (items = []) => {
	return { "items": items };
}

