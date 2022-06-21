const mongoose = require('mongoose')
require('mongoose-long')(mongoose);

//use mongoose-long to handle large data values for market cap and volume
const {Types: {Long}} = mongoose;

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastPrice: {
        type: Number,
        required: true
    },
    netChange: {
        type: Number,
        default: 0
    },
    percentChange: {
        type: Number,
        default: 0
    },
    marketCap: {
        type: Long,
    },
    country: {
        type: String,
    },
    ipo: {
        type: Number,
    },
    volume: {
        type: Long,
        required: true,
        default: 0
    },
    sector: {
        type: String,
    },
    industry: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Stock', stockSchema)