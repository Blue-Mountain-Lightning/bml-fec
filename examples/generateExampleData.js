/*
This script saves example API call for each endpoint to corresponding
files in the /examples directory.
*/
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

class Endpoint {
  constructor(category, name, endpoint, description) {
    this.category = category;
    this.name = name;
    this.endpoint = endpoint;
    this.description = description;
  }
}

const endpoints = [
                         // name , category, endpoint, description
  // Products
  new Endpoint('products', 'products', 'products', 'GET /products'),
  new Endpoint('products', 'information', 'products/40344', 'GET /products/:product_id'),
  new Endpoint('products', 'styles', 'products/40344/styles', 'GET /products/:product_id/styles'),
  new Endpoint('products', 'related', 'products/40344/related', 'GET /products/:product_id/related'),

  // Reviews
  new Endpoint('reviews', 'reviews', 'reviews?product_id=40344', 'GET /reviews'),
  new Endpoint('reviews', 'meta', 'reviews/meta?product_id=40344', 'GET /reviews/meta'),

  // Questions and answers
  new Endpoint('questionsAndAnswers', 'questions', 'qa/questions?product_id=40344', 'GET /qa/questions'),
  new Endpoint('questionsAndAnswers', 'answers', 'qa/questions/40344/answers', 'GET /qa/questions/:question_id/answers'),

  // Cart
  new Endpoint('cart', 'cart', 'cart', 'GET /cart')
]

console.log('Cleaning up examples directory...');

endpoints.forEach(async endpoint => {
  let file = path.join('examples', endpoint.category + '.js');
    try {
        await fs.promises.unlink(file);
    } catch (error) {
      // Files already deleted will throw an error, so this catches that.
    }
});

console.log('Requesting data...')

endpoints.forEach(async endpoint => {
    let url = BASE_URL + endpoint.endpoint;
    console.log(url);

    let file = path.join('examples', endpoint.category + '.js');
    let varName = endpoint.name;
    let description = endpoint.description;

    try {
      let response = await axios({
        url: url,
        headers: {'Authorization': process.env.AUTH}
      });

      let contents = `\n// ${description}\nmodule.exports.${varName} = ${JSON.stringify(response.data, null, 2)}\n`
      await fs.promises.appendFile(file, contents);

    } catch (error) {
      console.log(`Error on: ${url}`)
      console.log(error);
    }
})

console.log('Finished.')