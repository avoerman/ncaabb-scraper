ncaabb-scraper
==============

NCAA Basketball Data Scraper

Outputs data to /data directory on request.

### RPI Data
* Uses http://www.rpiforecast.com/live-rpi.html RPI Forecast Data
* Scrape by getting http://localhost:3001/rpidata
* Outputs json file to '/data/rpidata.json'

### Kenpom Data
* Uses http://kenpom.com/ Ken Pomeroy Data 
* Scrape by getting http://localhost:3001/kenpomdata
* Outputs json file to '/data/kenpomdata.json'

### BPI Data
* Uses http://espn.go.com/mens-college-basketball/bpi ESPN BPI Data 
* Scrape by getting http://localhost:3001/bpidata
* Outputs json file to '/data/bpidata.json'
