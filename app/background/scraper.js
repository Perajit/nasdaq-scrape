var phantom = require('phantom');
var cheerio = require('cheerio');
var nasdaqIndexService = require('../services/nasdaqIndex');

function scrape(target) {
  getRenderedContent(target)
    .then(function(content) {
      var data = extractData(content);
      console.log(data);
      nasdaqIndexService.insertMultipleData(data);
    });
}

function getRenderedContent(target) {
  var _ph;
  var _page;
  var _outObj;

  return phantom.create()
    .then(function(ph) {
      _ph = ph;
      return _ph.createPage();
    })
    .then(function(page) {
      _page = page;
      return _page.open(target);
    })
    .then(function(status) {
      return _page.property('content');
    })
    .then(function(content) {
      _page.close();
      _ph.exit();
      return content;
    })
    .catch(function(e) {
      console.log(e);
    });
}

function extractData(content) {
  var $ = cheerio.load(content);
  var indexRows = $('#indexTable tbody tr');
  var currentDateTime = new Date();
  var data = [];

  indexRows.each(function (i, row) {
    var indexCols = $(row).find('td');
    var indexName = indexCols.eq(0).text();
    var value = parseFloat(indexCols.eq(1).text());
    var changes = indexCols.eq(2).text().replace(/[^(-?\d\.)]/g,' ').trim().split(/\s+/);
    var netChange = parseFloat(changes[0]);
    var pctChange = parseFloat(changes[1]);

    netChange = isNaN(netChange) ? null : netChange;
    pctChange = isNaN(pctChange) ? null : pctChange * (netChange < 0 ? -1 : 1);

    data.push({
      indexName: indexName,
      dateTime: currentDateTime,
      value: isNaN(value) ? null : value,
      netChange: isNaN(netChange) ? null : netChange,
      pctChange: isNaN(pctChange) ? null : pctChange,
    });
  });

  return data;
}

module.exports = {
  scrape: scrape
};