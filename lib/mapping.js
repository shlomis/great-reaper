var _ = require('./utils');
var cheerio = require('cheerio');

function Mapping (selector) {
	var self = this;

	this._selector = selector;

	if (selector.indexOf('@') === -1) {
		this.resolve = resolveSelectorMapping;
	} else {
		this._prepareAttrSelector();
		this.resolve = resolveSelectorAttrMapping;
	}

	function resolveSelectorMapping ($item) {
		var items = $item.find(self._selector);
		var res = [];

		_.forEach(items,function (item){
			res.push(cheerio(item).text())
		});
		return res;
	}

	function resolveSelectorAttrMapping ($item) {
		return $item.find(self._selector).attr(self._attr);
	}
}

Mapping.prototype._prepareAttrSelector = function _prepareAttrSelector () {
	var tokens = this._selector.split('@');
	this._selector = tokens[0];
	this._attr = tokens[1];
};

module.exports = Mapping;
