require('dotenv').config()

const express = require('express')
const app = express()

const router = require('./routes/stocks')

const connectDB = require('./db/connect')

app.use(express.json())

app.use('/stocks', router)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))        
    } catch (error) {
        console.log(error)
    }
}

start()