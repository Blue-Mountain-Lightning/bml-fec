
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World this is the express server!')
})
app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening at http://localhost:${process.env.SERVER_PORT}`)
})

