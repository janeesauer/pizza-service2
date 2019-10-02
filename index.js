const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const port = 8080;  // constant for port number
const app = express();  // App is an express server
app.use(bodyparser.json());

const databaseUri = process.env.MONGODB_URL // 'mongodb://localhost:27107';
const connectOptions = { useUnifiedTopology: true, useNewUriParser: true};
const mongoClient = new MongoClient(databaseUri, connectOptions);
let pizzaCollection = null;
new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
        if (err) return reject(err);
        return resolve(client);
    });
}).then((client) => {
    console.log('Connected to database');
    const db = client.db('learninglunches');
    pizzaCollection = new PizzaCollection(db);
}).catch((err) => {
    console.error('Database connection failed');
    console.error(err);
    process.exit(1);
});

// In-memory database of pizzas, i.e. a constant
const pizzas = [
    {
        id: 1,
        name: "tandori hot",
        size: "12 inch",
        spicy: true
    },
    {
        id: 2,
        name: "meteor",
        size: "48 inch",
        spicy: false
    },
    {
        id: 3,
        name: "hawaiian",
        size: "12 inch",
        spicy: false
    },
    {
        id: 4,
        name: "pepperoni",
        size: "48 inch",
        spicy: true
    }
];

app.get('/pizzas', (req, resp) => {
    // Log which endpoint was hit
    console.log('Returning pizzas');

    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    // Return the pizzas collected
    resp.send(pizzas);
});

app.get('/pizzas/*', (req, resp) => {
    // Get the id from the URL path
    const id = parseInt(req.params[0]);

    // Log which endpoint was hit
    console.log('Endpoint /pizzas/${id} hit');

    // Find the pizza with the id in the request
    const pizza = pizzas.find(pizza => pizza.id === id);

    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    // If we find the pizza, return it, else return an error message
    // with status 404 (notfound)
    if (pizza) {
        resp.send(pizza);
    } else {
        resp.status(404).send('{error:"Pizza with ID ${id} not found"}');
    }
});

console.log(`Service listening on ${port}`);
app.listen(port);



