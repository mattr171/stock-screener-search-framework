const Stock = require('../models/stock')

const getStocks = async (req, res) => {
    const { symbol, name, country, sector, industry, numFilters, sort, flags } = req.query
    const queryObject = {}

    //symbol parameter should only return one stock
    if (symbol) {
        queryObject.symbol = symbol.toUpperCase()
    }

    //return any stocks with company name containing parameter
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    //return any stocks with company name containing parameter
    if (country) {
        queryObject.country = { $regex: country, $options: 'i' }
    }

    //return any stocks of industry containing parameter
    if (industry) {
        queryObject.industry = { $regex: industry, $options: 'i' }
    }

    //return any stocks of sector containing parameter
    if (sector) {
        queryObject.sector = { $regex: sector, $options: 'i' }
    }

    //allow user to filter by volume, net price change, last price, market capacity,
    // percent change, and IPO year
    if (numFilters) {
        //map query operations to regex
        const opMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numFilters.replace(regEx, (match) => `-${opMap[match]}-`)
        const options = ['volume', 'netChange', 'lastPrice', 'marketCap', 'percentChange', 'ipo']

        //using comma separated filters for each option
        filters = filters.split(',').forEach((item) => {
            var [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    //flag setting for types of stock, currently only has large caps
    if (flags) {
        let flagSelections = flags.split(',')
        flagSelections.forEach((item) => {
            if (item == 'largeCap') {
                queryObject.marketCap = {$gt: '10000000000'}
            }
        })
    }

    let result = Stock.find(queryObject)

    // sort by any field
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        //default to sorting by symbol
        result = result.sort('symbol')
    }

    // code for using page numbers and setting limits per page
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const stocks = await result

    res.status(200).json({ stocks, nbHits: stocks.length })
}

module.exports = getStocks