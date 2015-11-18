var util = require('util');

var categoryXpath = "//a[@class='main_page_link_catalog' and text()='%s']";

var commandsHomePage = {
	selectCategory: function(category, waitTime) {
		this.waitForElementVisible(util.format(categoryXpath, category), waitTime);
		this.click(util.format(categoryXpath, category));
	}
};

module.exports = {
	url: 'http://pn.com.ua',
	commands: [commandsHomePage],
	elements: {
		body: { selector: '//body', locateStrategy: 'xpath' }
	}
};