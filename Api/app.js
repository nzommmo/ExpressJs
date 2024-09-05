const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());  // Enable CORS for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let cars = [
    { id: 1, name: "Volvo", model: 'V8' },
    { id: 2, name: "Merc", model: 'V6' },
    { id: 3, name: "Toyota", model: 'V8' },
    { id: 4, name: "Maserati", model: 'V12' },
];

// Create new car
app.post('/cars', (req, res) => {
    const newCar = {
        id: cars.length + 1,
        name: req.body.name,
        model: req.body.model,  // If model is part of the request body
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Get car by ID
app.get('/cars/:id', (req, res) => {
    const car = cars.find(i => i.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
});

// Update car by ID
app.put('/cars/:id', (req, res) => {
    const car = cars.find(i => i.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).json({ message: 'Car not found' });
    }
    car.name = req.body.name;
    car.model = req.body.model;  // If model needs to be updated as well
    res.json(car);
});

// Delete car by ID
app.delete('/cars/:id', (req, res) => {
    const index = cars.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Car not found' });
    }
    const deletedCar = cars.splice(index, 1);
    res.json(deletedCar[0]);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
