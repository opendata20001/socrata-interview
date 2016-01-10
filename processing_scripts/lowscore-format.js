var fs = require('fs');
var _ = require('lodash');

var years = [2010, 2011, 2012, 2013, 2014];
var parsedData = [];

years.forEach(function(year) {
  var data = JSON.parse(fs.readFileSync('../aggragate/' + year + '-visn-semilowscore.json'));
  data.forEach(function(item) {
    item.year = year;
    parsedData.push(item);
  });
});

fs.writeFileSync('lowscore-combined.json', JSON.stringify(parsedData), 'utf8');

//data.forEach(function(val) {
//  var placement = 'facility-' + val['FACILITY'] + '-' + val['year'];
//  console.log(placement);
//  _.set(parsedData, placement + '.score-' + val['SCORE'], val['count_score']);
//  _.set(parsedData, placement + '.year', val['year']);
//  _.set(parsedData, placement + '.name', val['FACILITY']);
//});
//
//var csvData = "facility,year,score1,score2,score3,score4,score5\n";
//
//_.forEach(parsedData, function(val) {
//  csvData += val.name;
//  csvData += ',' + val['year'];
//  csvData += ',' + ((val['score-1']) ? val['score-1'] : '0');
//  csvData += ',' + ((val['score-2']) ? val['score-2'] : '0');
//  csvData += ',' + ((val['score-3']) ? val['score-3'] : '0');
//  csvData += ',' + ((val['score-4']) ? val['score-4'] : '0');
//  csvData += ',' + ((val['score-5']) ? val['score-5'] : '0') + "\n";
//});
//
//fs.writeFileSync('facility-score-prep.csv', csvData, 'utf8');
