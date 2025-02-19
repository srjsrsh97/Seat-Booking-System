import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const PRICING_TIERS = {
  SILVER: { price: 100, label: 'Silver', rows: ['A', 'B'] },
  GOLD: { price: 150, label: 'Gold', rows: ['C', 'D'] },
  PLATINUM: { price: 200, label: 'Platinum', rows: ['E', 'F'] }
};

export const MAX_SEATS = 8;
export const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const SEATS_PER_ROW = 10;

export const BookingProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const getPricingTier = (row) => {
    return Object.values(PRICING_TIERS).find(tier => 
      tier.rows.includes(row)
    );
  };

  const calculateTotal = (seats) => {
    return seats.reduce((total, seatId) => {
      const row = seatId.charAt(0);
      const tier = getPricingTier(row);
      return total + tier.price;
    }, 0);
  };

  const toggleSeat = (seatId) => {
    setError('');
    setShowConfirmation(false);

    if (selectedSeats.includes(seatId)) {
      const newSeats = selectedSeats.filter(id => id !== seatId);
      setSelectedSeats(newSeats);
      setTotalCost(calculateTotal(newSeats));
    } else {
      if (selectedSeats.length >= MAX_SEATS) {
        setError(`You can only select up to ${MAX_SEATS} seats`);
        return;
      }
      const newSeats = [...selectedSeats, seatId];
      setSelectedSeats(newSeats);
      setTotalCost(calculateTotal(newSeats));
    }
  };

  const handleBooking = () => {
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