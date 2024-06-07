/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CarList from "./Component/CarList/CarList";
import InvoiceGenerator from "./Component/InvoiceGenerator/InvoiceGenerator";
import "./App.css";
import Footer from "./Component/Footer/Footer";
import Navbar from "./Component/Navbar/Navbar";

const App = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const handleCloseForm = () => {
    setSelectedCar(null);
  };

  return (
    <>
      <div className="app-container">
        <Navbar />
        <CarList onSelectCar={handleSelectCar} />
      </div>
      <Footer />
      {selectedCar && (
        <div className="overlay">
          <div className="form-container">
            <button className="close-button" onClick={handleCloseForm}>
              &#10005;
            </button>
            <InvoiceGenerator car={selectedCar} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
