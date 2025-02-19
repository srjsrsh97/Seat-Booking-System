import React, { createContext, useState } from 'react';

// create a context for seat booking

export const BookingContext = createContext();

// price tier for seat categories

export const PRICING_TIERS = {
  SILVER: { price: 100, label: 'Silver', rows: ['A', 'B'] },
  GOLD: { price: 150, label: 'Gold', rows: ['C', 'D'] },
  PLATINUM: { price: 200, label: 'Platinum', rows: ['E', 'F'] }
};

export const MAX_SEATS = 8;
export const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const SEATS_PER_ROW = 10;

export const BookingProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]); // keeps track of the selected seats
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalCost, setTotalCost] = useState(0); // store the total cost

  const getPricingTier = (row) => {
    return Object.values(PRICING_TIERS).find(tier => 
      tier.rows.includes(row)
    );
  };


  // function to calculate the total cost of the selected seats
  const calculateTotal = (seats) => {
    return seats.reduce((total, seatId) => {
      const row = seatId.charAt(0);
      const tier = getPricingTier(row);
      return total + tier.price;
    }, 0);
  };


  // function to handle seat selection
  const toggleSeat = (seatId) => {
    setError('');
    setShowConfirmation(false);

    // if the seat is already selected, remove it
    if (selectedSeats.includes(seatId)) {
      const newSeats = selectedSeats.filter(id => id !== seatId);
      setSelectedSeats(newSeats);
      setTotalCost(calculateTotal(newSeats));
    } else {
      // if the maximum seat limit is reached, shows an error
      if (selectedSeats.length >= MAX_SEATS) {
        setError(`You can only select up to ${MAX_SEATS} seats`);
        return;
      }
      // add new seat selection
      const newSeats = [...selectedSeats, seatId];
      setSelectedSeats(newSeats);
      setTotalCost(calculateTotal(newSeats));
    }
  };

  const handleBooking = () => {
    // checks if atleast one seat is selected before booking confirmation
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }
    setShowConfirmation(true);
    setError('');
  };

  const resetBooking = () => {
    setSelectedSeats([]);
    setError('');
    setShowConfirmation(false);
    setTotalCost(0);
  };

// context value that will be available throughout the app

  const value = {
    selectedSeats,
    error,
    showConfirmation,
    totalCost,
    toggleSeat,
    handleBooking,
    resetBooking,
    getPricingTier
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};