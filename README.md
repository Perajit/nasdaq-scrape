# nasdaq-scrape

This project is an application providing timeseries data of NASDAQ's indexes. 
It has 2 sections:
- RESTFUL API: for users to query data.
- Background Process: running to periodically scrape data from [NASDAQ website](http://www.nasdaq.com/)

## RESTFUL API
This is the API users can call to get data of any NASDAQ's index at any specific time period using GET method.
The url looks like:
- \[host]:[port]/api/nasdaq/[index]?start=[start]&end=[end].

Where:
- \[host] is the host on which the application runs.
- \[port] is the port on which the application runs. (Default is 5555).
- \[index] is the index name you want to retrieve data. If you want to get data of all indexes, use 'all'.
- \[start] is the starting time of interest in ISO format (optional).
- \[end] is the ending time of intererst in ISO format (optional).

Example:
- http://localhost:5555/api/nasdaq/all?start=2017-02-05T10:19:12.703Z&end=2017-02-05T10:20:11.238Z
- http://localhost:5555/api/nasdaq/NASDAQ?end=2017-02-05T10:20:11.238Z
- http://localhost:5555/api/nasdaq/After%20Hours%20(NDX)

## Background Process
The process periodically run to scrape data from [NASDAQ website](http://www.nasdaq.com/).

## Prerequisite
- NodeJS
- MongoDB

## Install Application
From the project folder, run command:
```
npm install
```

## Run Application
Run the application including both API and background service.
From the project folder, run command:
```
npm start
```

## Run test
Run testing for the application.
From the project folder, run command:
```
npm test
```