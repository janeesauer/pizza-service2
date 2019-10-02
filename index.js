const express = require('express');

const port = 8080;  // constant for port number
const app = express();

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
    }
    {
        id: 3,
        name: "hawaiian",
        size: "12 inch",
        spicy: false
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



