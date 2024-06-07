/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarList.css"; // Import the CSS file for styling
import Banner from "../Banner/Banner";

const CarList = ({ onSelectCar }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://exam-server-7c41747804bf.herokuapp.com/carsList"
        );

        if (response.data.status === "success") {
          setCars(response.data.data);
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Error fetching car data");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Banner />
      <div className="car-list-container">
        <h2>Select a Car</h2>
        <ul className="car-list">
          {cars.length > 0 ? (
            cars.map((car) => (
              <li
                key={car.id}
                onClick={() => onSelectCar(car)}
                className="car-item"
              >
                <img
                  src={car.imageURL}
                  alt={`${car.make} ${car.model}`}
                  className="car-image"
                />
                <div className="car-details">
                  <div className="car-name">
                    {car.make} {car.model}
                  </div>
                  <div className="car-rates">
                    <div>Hourly: ${car.rates.hourly}</div>
                    <div>Daily: ${car.rates.daily}</div>
                    <div>Weekly: ${car.rates.weekly}</div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No cars available</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CarList;
