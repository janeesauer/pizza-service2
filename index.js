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
];

app.get('/pizzas', (req, resp) => {
    console.log('Returning pizzas');
    resp.setHeader('Content-Type', 'application/json');
    resp.send(pizzas);
});

console.log(`Service listening on ${port}`);
app.listen(port);



