import React, { useContext } from 'react'
import styles from './BookingSummary.module.css'
import { BookingContext } from '../context'

const BookingSummary = () => {

    const { getPricingTier, totalCost, selectedSeats, handleBooking, showConfirmation, resetBooking } = useContext(BookingContext)

    // console.log(showConfirmation);
    // console.log(selectedSeats);
    
    
    return (
        <>
        <div className={styles.bookingSummary}>
            <h2>Booking Summary</h2>

            {selectedSeats.length > 0 ? (
                <div className={styles.selectedSeats}>
                    <h3>Selected Seats:</h3>
                    <div className={styles.selectedSeatInfo}>
                        {selectedSeats.map(seatId => {
                            const row = seatId.charAt(0);
                            const tier = getPricingTier(row);
                            return (
                                <div key={seatId} className={styles.seatTag}>
                                    {seatId} - ₹{tier.price}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <p>No seats selected</p>
            )}

            <div className={styles.total}>
                Total: ₹{totalCost}
            </div>

            <button
                onClick={() => handleBooking()}
                className={styles.bookNow}
            >
                Book Now
            </button>
        </div>
        {showConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>🎉 Booking Confirmed!</h2>
            <p>You have successfully booked {selectedSeats.length} seat(s):</p>
            <p className={styles.seatList}>{selectedSeats.join(", ")}</p>
            <p className={styles.totalCost}>Total: ₹{totalCost}</p>
            <button className={styles.closeButton} onClick={() => resetBooking()}>
              Ok
            </button>
          </div>
        </div>
      )}
        </>
    )
}

export default BookingSummary
