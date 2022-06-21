# stock-screener-search-framework

Backend framework for search feature on a stock screener

Example data retrieved from CSV download at https://www.nasdaq.com/market-activity/stocks/screener converted to JSON, properties changed as shown in example,

Uses MongoDB to store stock data

# Install
1. Install all dependencies
2. node create.js (make sure db is running)
3. npm start
4. Use Postman or similar service to send queries

# Query Options
```
symbol=${var}
name=${var}
country=${var}
sector=${var}
industry=${var}
numFilters=${filter}${operator}${value}[,...] 
sort=${var}
flags=${var} (currently only uses largeCap
```
