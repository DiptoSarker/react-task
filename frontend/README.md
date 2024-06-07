# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Handling Edge Cases

When calculating rental charges, we ensure that the customer does not pay more than necessary for partial periods. For example, if a Tesla costs $10 per hour and $50 per day, renting for six hours would cost $60 (6 \* $10). To avoid overcharging, we cap the cost at the daily rate if the hourly total exceeds the daily rate. Similarly, if the weekly rate is cheaper than the sum of daily rates for a long rental, we use the weekly rate.

### Example

- **Hourly Rate**: $10
- **Daily Rate**: $50
- **Weekly Rate**: $300

#### Scenarios

- **6 hours rental**:
  - Hourly total: 6 \* $10 = $60
  - Daily rate: $50
  - **Charged**: $50 (since $60 > $50)
- **8 days rental**:
  - Daily total: 8 \* $50 = $400
  - Weekly total: 1 week + 1 day = $300 + $50 = $350
  - **Charged**: $350 (since $350 < $400)

{/_ 5th Container _/}

        {/* <div className="reservation-details-container">
          <h3>Reservation Details</h3>
          <hr />
          <div className="invoice-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={customer.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleInputChange}
            />
            <div className="date-picker-container">
              <DatePicker
                selected={rentalDetails.pickupDate}
                onChange={(date) => handleRentalChange(date, "pickupDate")}
                placeholderText="Pickup Date"
                className="date-picker"
              />
              <DatePicker
                selected={rentalDetails.dropoffDate}
                onChange={(date) => handleRentalChange(date, "dropoffDate")}
                placeholderText="Dropoff Date"
                className="date-picker"
              />
            </div>
            <input
              type="text"
              placeholder="Additional Charges"
              value={additionalCharges}
              onChange={(e) => setAdditionalCharges(parseFloat(e.target.value))}
            />
            <input
              type="number"
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
            <button onClick={handleGenerateInvoice}>Generate Invoice</button>
          </div>
        </div> */}
