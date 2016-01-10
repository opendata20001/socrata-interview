  d3.json('lowscore-combined.json', function(data) {
    createLowScoreChart(data);
    createTable(data);
  });

  function createLowScoreChart(data) {
    var parsedData = {};
    data.forEach(function(datum) {
      if (!parsedData[datum.location]) {parsedData[datum.location] = {};}
      if (!parsedData[datum.location][datum.year]) {parsedData[datum.location][datum.year] = 0;}
      parsedData[datum.location][datum.year]++;
    });

    var chartData = [];
    var years = [2010, 2011, 2012, 2013, 2014];

    _.forEach(parsedData, function(datum, key) {
      var dataRow = [key];
      years.forEach(function(year) {
        var val = (datum[year]) ? datum[year] : 0;
        dataRow.push(val);
      });
      chartData.push(dataRow);
    });

    chartData = chartData.sort(function(a, b) {
      var locationA = a[0].replace('VISN ', ''),
          locationB = b[0].replace('VISN ', '');

      return (locationA * 1) - (locationB * 1);
    });

    var chart = c3.generate({
      size: {
        height: 500
      },
      bindto: "#lowscorebyvisn-chart",
      data: {
        columns: chartData
      },
      tooltip: {
        grouped: false
      },
      axis: {
        x: {
          tick: {
            format: function(d) {return 2010 + d;}
          }
        },
        y: {
          label: {
            text: "Number of measures further than 20% away from goal.",
            position: "outer-center"
          },
          tick: {
            values: [0, 1, 2, 3, 4]
          }
        }
      }
    });
  }

  function createTable(data) {
    var rows = d3.select('#lowscore-table tbody')
      .selectAll('tr')
      .data(data)
      .enter()
      .append('tr');

    rows.append("td").text(function(d) {return d.measure});
    rows.append("td").text(function(d) {return d.location});
    rows.append("td").text(function(d) {return d.year});
    rows.append("td").text(function(d) {return d.score});

    var sortableTable = document.querySelector('#lowscore-table');
    Sortable.initTable(sortableTable);
  }
