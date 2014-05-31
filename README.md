ncaabb-scraper
==============

NCAA Basketball Data Scraper

Outputs data to /data directory on request.

Start server on port 3000 with a simple

'''node app''''
### Scrape all data ###
* Scrape by getting http://localhost:3000/alldata
* By default, a data will output in a json file to '/data/alldata.json'
* Uses data from the below sources

Individual datasets can be scraped individually.

### RPI Data
* Uses http://www.rpiforecast.com/live-rpi.html RPI Forecast Data
* Scrape by getting http://localhost:3000/rpidata
* Outputs json file to '/data/rpidata.json'

### Kenpom Data
* Uses http://kenpom.com/ Ken Pomeroy Data
* Scrape by getting http://localhost:3000/kenpomdata
* Outputs json file to '/data/kenpomdata.json'

### BPI Data
* Uses http://espn.go.com/mens-college-basketball/bpi ESPN BPI Data
* Scrape by getting http://localhost:3000/bpidata
* Outputs json file to '/data/bpidata.json'

### Bracket Matrix Data
* Uses http://bracketmatrix.com/ Bracket Matrix Data
* Scrape by getting http://localhost:3000/bracketmatrixdata
* Outputs json file to '/data/bracketmatrixdata.json'
