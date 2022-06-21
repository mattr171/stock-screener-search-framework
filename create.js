//generate db for stock json

require('dotenv').config()

const connectDB = require('./db/connect')
const Stock = require('./models/stock')

const jsonStocks = require('./stocks.json')

//clean data in stock json so that prices and percent changes are numbers
//instead of strings
jsonStocks.forEach((x) => {
    var price = x.lastPrice.substring(1)
    var priceNum = parseFloat(price)
    x.lastPrice = priceNum

    x.percentChange = parseFloat(x.percentChange)

    if (isNaN(x.percentChange)) {
        x.percentChange = 0
    }
})

//populate db
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Stock.deleteMany()
        await Stock.create(jsonStocks)
        console.log('Successfully populated database')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()