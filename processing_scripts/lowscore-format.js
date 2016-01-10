/**
 * @file: Generates a combined json file of the lowscore counts for each VISN.
 */

var fs = require('fs');
var _ = require('lodash');

var years = [2010, 2011, 2012, 2013, 2014];
var parsedData = [];

years.forEach(function(year) {
  var data = JSON.parse(fs.readFileSync('../data/aggregate/' + year + '-visn-semilowscore.json'));
  data.forEach(function(item) {
    item.year = year;
    parsedData.push(item);
  });
});

fs.writeFileSync('../data/aggregate/lowscore-combined.json', JSON.stringify(parsedData), 'utf8');
