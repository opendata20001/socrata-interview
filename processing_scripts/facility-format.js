/**
 * @file: Generates a csv file for use in Socrata to show a stacked bar chart of the number
 * of scored measurements for each facility in the VA Aspire database.
 */

var fs = require('fs');
var _ = require('lodash');

var data = JSON.parse(fs.readFileSync('../data/aggregate/facility-score-aggregate.json'));

var parsedData = {};

data.forEach(function(val) {
  var placement = 'facility-' + val['FACILITY'] + '-' + val['year'];
  console.log(placement);
  _.set(parsedData, placement + '.score-' + val['SCORE'], val['count_score']);
  _.set(parsedData, placement + '.year', val['year']);
  _.set(parsedData, placement + '.name', val['FACILITY']);
});

var csvData = "facility,year,score1,score2,score3,score4,score5\n";

_.forEach(parsedData, function(val) {
  csvData += val.name;
  csvData += ',' + val['year'];
  csvData += ',' + ((val['score-1']) ? val['score-1'] : '0');
  csvData += ',' + ((val['score-2']) ? val['score-2'] : '0');
  csvData += ',' + ((val['score-3']) ? val['score-3'] : '0');
  csvData += ',' + ((val['score-4']) ? val['score-4'] : '0');
  csvData += ',' + ((val['score-5']) ? val['score-5'] : '0') + "\n";
});

fs.writeFileSync('../data/aggregate/facility-score-prep.csv', csvData, 'utf8');
