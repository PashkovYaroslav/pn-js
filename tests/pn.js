var waitTime = parseInt('10000');

var category = 'Компьютеры';
var subcategory = 'Ноутбуки, планшеты';
var manufacturer = 'Acer';

module.exports = {
	'Check filter by price' : function (client) {
		var home = client.page.homePage();
		home.navigate();
		home.selectCategory(category, waitTime);

		var categoryPage = client.page.categoryPage();
		categoryPage.selectSubcategory(subcategory, waitTime);

		var price = client.page.pricePage();
		price.selectMinPrice(waitTime);
		price.selectMaxPrice(waitTime);
		price.checkAllPrices(client);

		client.end();
	},

	'Check filter by manufacturer name': function (client) {
		var home = client.page.homePage();
		home.navigate();
		home.selectCategory(category, waitTime);

		var categoryPage = client.page.categoryPage();
		categoryPage.selectSubcategory(subcategory, waitTime);

		var price = client.page.pricePage();
		price.clickOnMoreManufacturers(waitTime);
		price.getProductCountByManufacturer(manufacturer);
		price.selectManufacturer(manufacturer, waitTime);
		price.checkCountOfProducts(waitTime);
		price.checkProductNames(manufacturer, client);
		client.end();
	},

	'Check search by name of product' : function (client) {
		var home = client.page.homePage();
		home.navigate();
		home.selectCategory(category, waitTime);

		var categoryPage = client.page.categoryPage();
		categoryPage.selectSubcategory(subcategory, waitTime);

		var price = client.page.pricePage();
		price.sortByPrice(waitTime);
		price.searchForProduct(client, waitTime);
		price.checkProductsSize(client, 1, waitTime);
		price.checkFirstProduct();
		client.end();
	}
};