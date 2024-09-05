import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const API_URL = 'http://localhost:3000/cars'; // Update the API URL to match your backend route
  const [cars, setCars] = useState([]);
  const [newCarName, setNewCarName] = useState('');
  const [newCarModel, setNewCarModel] = useState('');
  const [editCar, setEditCar] = useState(null);

  // Fetch Cars
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error Fetching Cars', error);
      });
  }, []);

  // Add new Car
  const handleAddCar = () => {
    axios.post(API_URL, { name: newCarName, model: newCarModel })
      .then(response => {
        setCars([...cars, response.data]); // Correct spread operator usage
        setNewCarName(''); // Clear the input after adding
        setNewCarModel('');
      })
      .catch(error => {
        console.error('Error adding car:', error);
      });
  };

  // Allow editing cars
  const handleEditCars = (car) => {
    setEditCar(car);
    setNewCarName(car.name);
    setNewCarModel(car.model);
  };

  // Update car
  const handleUpdateCar = () => {
    if (editCar) {
      axios.put(`${API_URL}/${editCar.id}`, { name: newCarName, model: newCarModel })
        .then(response => {
          setCars(cars.map(i => (i.id === editCar.id ? response.data : i)));
          setNewCarName(''); // Clear the input after updating
          setNewCarModel('');
          setEditCar(null);
        })
        .catch(error => {
          console.error('Error updating car:', error);
        });
    }
  };

  // Delete car
  const handleDeleteCar = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setCars(cars.filter(i => i.id !== id));
      })
      .catch(error => {
        console.error('Error deleting car:', error);
      });
  };

  return (
    <div>
      <h1>Cars</h1>

      <div>
        <input
          type="text"
          value={newCarName}
          onChange={e => setNewCarName(e.target.value)}
          placeholder="Enter car name"
        />
        <input
          type="text"
          value={newCarModel}
          onChange={e => setNewCarModel(e.target.value)}
          placeholder="Enter car model"
        />

        {editCar ? (
          <button onClick={handleUpdateCar}>Update Car</button>
        ) : (
          <button onClick={handleAddCar}>Add Car</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.model}</td>
              <td>
                <button onClick={() => handleEditCars(car)}>Edit</button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
