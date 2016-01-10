# Veteran Affairs ASPIRE Ratings Dashboard

http://opendata20001.github.io/socrata-interview/

## Contents of this repo

- `./processing_scripts` - A set of NodeJS scripts to help with generating specific views of the raw data.
- `./data` - The raw data and generated files for this dashboard.

## Queries

As a part of generating the data for the dashboard, I made several Soda queries against the data in Socrata.

#### SCORE AGGREGATE:

`SELECT COUNT(score), score, facility GROUP BY facility, score ORDER BY facility, score`

#### SCORE MEASURES:

`SELECT COUNT(score), score, measure WHERE facility != 0 GROUP BY measure, score ORDER BY measure, score`

#### SCORE MEASURES BY VISN:

`SELECT COUNT(score), score, measure, visn WHERE facility = 0 GROUP BY score, measure, visn ORDER BY visn, measure, score`

#### VISN MEASURES:

`SELECT * WHERE facility = 0 AND score != 0 ORDER BY visn`

#### FACILITIES/VISN's WITH LOW SCORES:

`SELECT * WHERE score < 3 AND score != 0 AND facility = 0`