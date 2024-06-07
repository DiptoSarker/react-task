/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "../../assets/yui.jpeg";
import "./InvoiceGenerator.css";

const InvoiceGenerator = ({ car }) => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [rentalDetails, setRentalDetails] = useState({
    pickupDate: null,
    dropoffDate: null,
  });
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const [carr, setCar] = useState({
    type: "",
    brand: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleCloseForm = () => {
    setInvoice(null);
  };

  const handlePhoneChange = (value) => {
    setCustomer({ ...customer, phone: value });
  };

  const handleRentalChange = (date, name) => {
    setRentalDetails({ ...rentalDetails, [name]: date });
  };

  const [selectedDuration, setSelectedDuration] = useState("");
  const durations = ["1 Hour", "1 Day", "1 Week"];

  const [selectedOption, setSelectedOption] = useState("");
  const rates = [
    "Collision Damage Waiver:  $9",
    "Liability Insurance:   $15",
    "Rental Tax:   11.5%",
  ];

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedDuration(value);
  };

  const calculateRentalCharges = () => {
    let totalAmount = 0;

    if (selectedDuration === "1 Hour") {
      totalAmount += car.rates["hourly"];
    } else if (selectedDuration === "1 Day") {
      totalAmount += car.rates["daily"];
    } else if (selectedDuration === "1 Week") {
      totalAmount += car.rates["weekly"];
    }

    let additional = 0;

    if (selectedOption === "Collision Damage Waiver:  $9") {
      additional += 9;
    } else if (selectedOption === "Liability Insurance:   $15") {
      additional += 15;
    } else if (selectedOption === "Rental Tax:   11.5%") {
      additional += (totalAmount * 11.5) / 100;
    }

    totalAmount += additional - discount;
    return { totalAmount, additional };
  };

  const handleGenerateBill = () => {
    const { totalAmount, additional } = calculateRentalCharges();

    setPrice({
      customer,
      rentalDetails,
      car,
      additionalCharges: additional,
      discount,
      totalAmount,
    });
  };

  const handleGenerateInvoice = () => {
    const { totalAmount, additional } = calculateRentalCharges();

    setInvoice({
      customer,
      rentalDetails,
      car,
      additionalCharges: additional,
      discount,
      totalAmount,
    });
  };

  return (
    <>
      <h2>
        Reservation of {car.make}-{car.model}
      </h2>

      <button
        onClick={handleGenerateBill}
        disabled={
          !(
            customer.firstName &&
            customer.lastName &&
            customer.email &&
            rentalDetails.pickupDate &&
            rentalDetails.dropoffDate &&
            selectedDuration
          )
        }
      >
        See the bill
      </button>

      <div className="invoice-generator-container">
        {/* 1st Container */}
        <div className="reservation-details-container">
          <h4>Reservation Details</h4>
          <hr className="hr" />
          <div className="invoice-form">
            <input
              type="text"
              name="name"
              placeholder="Reservation ID"
              value={customer.name}
              onChange={handleInputChange}
            />

            <DatePicker
              id="date"
              selected={rentalDetails.pickupDate}
              onChange={(date) => handleRentalChange(date, "pickupDate")}
              placeholderText="Pickup Date"
              className="date-picker"
            />

            <DatePicker
              id="datee"
              selected={rentalDetails.dropoffDate}
              onChange={(date) => handleRentalChange(date, "dropoffDate")}
              placeholderText="Return Date"
              className="date-picker"
            />
            <h5>Duration</h5>
            <form className="duration">
              {durations.map((duration, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={selectedDuration === duration}
                      onChange={handleRadioChange}
                      style={{ marginRight: "8px" }}
                    />
                    {duration}
                  </label>
                </div>
              ))}
            </form>
            <h5>Discount</h5>
            <input
              id="discount"
              type="number"
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* 2nd Container */}
        <div className="reservation-details-container">
          <h4>Customer Information</h4>
          <hr className="hr" />
          <div className="invoice-form">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={customer.firstName}
              required
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={customer.lastName}
              required
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              required
              onChange={handleInputChange}
            />
            <h5>Phone Number</h5>
            <PhoneInput
              country={"us"}
              value={customer.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
        </div>

        {/* 3rd Container */}
        <div className="lastTwo">
          <div className="reservation-details-container">
            <h4>Vehicle Informations</h4>
            <hr className="hr" />
            <div className="invoice-form">
              <select
                id="carType"
                value={carr.type}
                style={{
                  padding: "8px",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                }}
                onChange={(e) => setCar({ ...carr, type: e.target.value })}
              >
                <option value="">Select Car Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Convertible">Convertible</option>
              </select>

              <select
                id="carBrand"
                value={carr.brand}
                style={{
                  padding: "8px",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                }}
                onChange={(e) => setCar({ ...carr, brand: e.target.value })}
              >
                <option value="">Select Car Brand</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
              </select>
            </div>
          </div>

          {/* 4th Container */}
          <div className="reservation-details-container">
            <h4>Additional Charges</h4>
            <hr className="hr" />
            <div className="invoice-form">
              <form>
                {rates.map((rate, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="rate"
                        value={rate}
                        checked={selectedOption === rate}
                        onChange={handleCheckboxChange}
                        style={{ marginRight: "8px" }}
                      />
                      {rate}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>

        {/* Bill Display */}
        {price && (
          <div className="invoice-form another">
            <h3>Bill</h3>
            <p>
              Customer Name:{" "}
              {price.customer.firstName + " " + price.customer.lastName}
            </p>
            <p>Email: {price.customer.email}</p>
            <p>Phone: {price.customer.phone}</p>
            <p>
              Pickup Date: {price.rentalDetails.pickupDate.toLocaleDateString()}
            </p>
            <p>
              Dropoff Date:{" "}
              {price.rentalDetails.dropoffDate.toLocaleDateString()}
            </p>
            <p>Car: {car.make}</p>
            <p>Additional Charges: ${price.additionalCharges}</p>
            <p>Discount: ${price.discount}</p>
            <p>Total Amount: ${price.totalAmount.toFixed(2)}</p>
            <button
              onClick={handleGenerateInvoice}
              disabled={
                !(
                  customer.firstName &&
                  customer.lastName &&
                  customer.email &&
                  rentalDetails.pickupDate &&
                  rentalDetails.dropoffDate &&
                  selectedDuration
                )
              }
            >
              Generate Invoice
            </button>
          </div>
        )}

        {/* Invoice Display */}
        {invoice && (
          <div className="overlay">
            <div className="form-containerr">
              <button className="close-button" onClick={handleCloseForm}>
                &#10005;
              </button>
              <div className="left-part">
                <div className="company-add">
                  <img className="img" src={logo} alt="" />
                </div>
                <div className="invoice-text">
                  <p>
                    Customer Name:{" "}
                    {invoice.customer.firstName +
                      " " +
                      invoice.customer.lastName}
                  </p>
                  <p>Email: {invoice.customer.email}</p>
                  <p>Phone: {invoice.customer.phone}</p>
                  <p>
                    Pickup Date:{" "}
                    {invoice.rentalDetails.pickupDate.toLocaleDateString()}
                  </p>
                  <p>
                    Dropoff Date:{" "}
                    {invoice.rentalDetails.dropoffDate.toLocaleDateString()}
                  </p>
                  <p>Car: {car.make}</p>
                  <p>Additional Charges: ${invoice.additionalCharges}</p>
                  <p>Discount: ${invoice.discount}</p>
                  <p>Total Amount: ${invoice.totalAmount.toFixed(2)}</p>
                  <button
                    onClick={() => window.print()}
                    className="print-button"
                  >
                    Print Invoice
                  </button>
                </div>
              </div>
              <div className="right-part">
                <div className="tag">
                  <h3>Terms And Conditions</h3>
                </div>
                <h5>
                  By renting a vehicle from our car rental shop, you agree to
                  the following terms and conditions: 1. The vehicle is to be
                  used for personal transportation only. 2. Only authorized
                  drivers listed on the rental agreement with valid driver's
                  licenses are permitted to operate the vehicle. 3. Basic
                  insurance coverage is provided, with optional additional
                  coverage available for purchase. 4. Renters must inspect the
                  vehicle for damages before accepting it and are responsible
                  for returning it in the same condition. 5. Fuel must be
                  returned at the same level as indicated at the time of rental.
                  6. Reservation changes and cancellations are subject to fees.
                  7. Late returns may incur additional charges. 8. The vehicle
                  must not be used for unlawful purposes, smoking, or
                  transporting pets unless specified. 9. Renters are responsible
                  for toll charges, and must promptly report mechanical issues
                  or accidents. 10. Renters are liable for any damages incurred
                  during the rental period, and agree to indemnify and hold
                  harmless the rental shop.
                </h5>
                <div className="ranter-info">
                  <h2>Renter Info</h2>
                  <h3>Mr. Car deal</h3>
                  <h3>cardeal@gmail.com</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceGenerator;
