const axios = require('axios');

require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))

/* middleware */
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Serving ${req.method} ${req.url}...`);
  next();
  }
)

app.all('/endpoint/*', async (req, res) => {
  const url = process.env.BASE_URL + '/' + req.url.slice(10);
  const method = req.method;
  const data = req.body;
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        Authorization: process.env.TOKEN,
      }
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('build/index.html'));
})

app.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`)
})

