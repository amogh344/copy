// 1. Install express first (run this in your terminal):
// npm install express

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// In-memory product list (sample data structure)
let products = [];
let nextId = 1;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// GET /products - return all products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products - add a new product
app.post('/products', (req, res) => {
  const product = { id: nextId++, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

// GET /products/:id - return product by id
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// PUT /products/:id - update product by id
app.put('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');
  products[productIndex] = { id: products[productIndex].id, ...req.body };
  res.json(products[productIndex]);
});

// DELETE /products/:id - delete product by id
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');
  const deleted = products.splice(productIndex, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
