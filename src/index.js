var str = require('./constant');
var $ = require('jquery');

var App = function() {
	// console.log(str);
	$('body').html('<h1>' + str + '</h1>');
};

var app = new App();
app.get = function() {};
