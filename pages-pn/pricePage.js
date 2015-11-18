var util = require('util');
var assert = require('assert');

var minPriceXpath = "((//div[@class='group'])[1]//a)[1]";
var maxPriceXpath = "((//div[@class='group'])[2]//a)[1]";
var pricesXpath = "//div[@class='price']/strong";
var moreManufacturersXpath = "//a[contains(@class,'show_common_producer')]";
var manufacturerXpath = "//div[text()='Производитель:']/following-sibling::div//a[text()='%s']";
var manufacturerCountBeforeXpath = "//div[text()='Производитель:']/following-sibling::div//a[text()='%s']/following-sibling::i[1]";
var countXpath = "//div[@class='total']/b";
var sortXpath = "//div[@class='order']/a[text()='цена']";
var firstProductXpath = "(//div[@class='item'])[1]/div[@class='name']/a";
var searchFieldXpath = "//input[@id='edit-name-1']";
var productsXpath = "//div[@class='item']";

var minPrice;
var maxPrice;
var totalCountBefore;
var cheapestProductName;

var commandsPricePage = {
    clickOnMoreManufacturers: function (waitTime) {
        this.waitForElementVisible(moreManufacturersXpath, waitTime)
            .click(moreManufacturersXpath);
        this.expect.element(moreManufacturersXpath).text.to.equal("скрыть остальные").before(2000);
    },

    getProductCountByManufacturer: function (manufacturer) {
        this.getText(util.format(manufacturerCountBeforeXpath, manufacturer), function (result) {
            totalCountBefore = result.value;
            totalCountBefore = totalCountBefore
                .replace("(", "")
                .replace(")", "");
        });
    },

    checkCountOfProducts: function (waitTime) {
        this.waitForElementVisible(countXpath, waitTime);
        this.getText(countXpath, function (result) {
            assert.equal(totalCountBefore.trim(), result.value.trim());
        });
    },

    checkProductNames: function (manufacturer, client) {
        client.elements("xpath", productsXpath, function (result) {
            for (var i = 1; i <= result.value.length; i++) {
                client.getText("(//div[@class='item'])[" + i + "]/div[@class='name']/a", function (result) {
                    assert(result.value.startsWith(manufacturer));
                })
            }
        });
    },

    selectManufacturer: function (manufacturer, waitTime) {
        this.click(util.format(manufacturerXpath, manufacturer));
    },

    selectMinPrice: function (waitTime) {
        this.waitForElementVisible(minPriceXpath, waitTime);
        this.getText("xpath", minPriceXpath, function (result) {
            minPrice = result.value;
        });
        this.click(minPriceXpath);
    },

    selectMaxPrice: function (waitTime) {
        this.waitForElementVisible(maxPriceXpath, waitTime);
        this.getText("xpath", maxPriceXpath, function (result) {
            maxPrice = result.value;
        });
        this.click(maxPriceXpath);
    },

    sortByPrice: function(waitTime) {
        this.waitForElementVisible(sortXpath, waitTime);
        this.click(sortXpath);
    },

    searchForProduct: function(client, waitTime) {
        client.waitForElementVisible(firstProductXpath, waitTime);
        client.getText(firstProductXpath, function(result) {
            cheapestProductName = result.value;
            client.setValue(searchFieldXpath, [cheapestProductName, client.Keys.ENTER]);
        });
    },

    checkProductsSize: function(client, size, waitTime) {
        client.waitForElementVisible("(//div[@class='item'])[1]", waitTime);
        client.elements("xpath", productsXpath, function(result) {
            assert(result.value.length == size);
        });
    },

    checkFirstProduct: function() {
        this.getText(firstProductXpath, function(result) {
            assert.equal(result.value, cheapestProductName);
        });
    },

    checkAllPrices: function (client) {
        client.elements("xpath", pricesXpath, function (result) {
            for (var i = 1; i <= result.value.length; i++) {
                client.getText("(" + pricesXpath + ")[" + i + "]", function (result) {
                    var cost = result.value.replace(" ", "").replace("грн", "");
                    assert(cost <= maxPrice && cost >= minPrice);
                })
            }
        });
    }
};

module.exports = {
    commands: [commandsPricePage],
    elements: {
        body: {selector: '//body', locateStrategy: 'xpath'},
        prices: {selector: pricesXpath, locateStrategy: 'xpath'},
        more: {selector: moreManufacturersXpath, localeStrategy: 'xpath'},
        countOfProducts: {selector: countXpath, localeStrategy: 'xpath'},
        sortByPrice: {selector: sortXpath, localeStrategy: 'xpath'}
    }
};