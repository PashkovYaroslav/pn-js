var util = require('util');

var subcategoryXpath = "//div[contains(@class,'ct')]/a[text()='%s']";

var commandsCategoryPage = {
    selectSubcategory: function (subcategory, waitTime) {
        this.waitForElementVisible(util.format(subcategoryXpath, subcategory), waitTime);
        this.click(util.format(subcategoryXpath, subcategory));
    }
};

module.exports = {
    commands: [commandsCategoryPage],
    elements: {
        body: {selector: '//body', locateStrategy: 'xpath'}
    }
};