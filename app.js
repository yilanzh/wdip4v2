var express = require('express');
var path = require('path');
var ejs = require('ejs');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();
var today = require('./other.js');

//setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//setup middleware
app.use(express.static(path.join(__dirname, 'bower_components')));

//insert title and url
var siteData = {
	title: "BBG Top News",
	url: "http://www.bloomberg.com/",
	lastupdate: today(),
};

//route
app.get('/', function(req, res){
	res.render('index', {
		siteName: siteData.title,
		lastupdateon: siteData.lastupdate,
	});
});
	
app.get('/scrape', function(req, res){
	url = siteData.url;
	var nameArr = [];
	var urlArr = [];
	request(url, function(error, response, html){
		if(!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			$('h1.top-news-v3__story__headline').each(function(i, v){
				nameArr.push($(this).text().trim());
				urlArr.push(siteData.url + $(this).children().first().attr('href'));
			});		
		}
		
		res.render('output', {
				siteName: siteData.title,
				lastupdate: today(),
				nameArr: nameArr,
				urlArr: urlArr
			});
	});
});

app.listen(3000, function(){
	console.log("ready on port 3000");
});
