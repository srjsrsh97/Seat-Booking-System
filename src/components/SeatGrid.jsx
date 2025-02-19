import React, { useContext } from 'react'
import styles from './SeatGrid.module.css'
import { PRICING_TIERS, ROWS, SEATS_PER_ROW, BookingContext } from '../context';
const SeatGrid = () => {

  const { getPricingTier, toggleSeat, selectedSeats, error } = useContext(BookingContext)

  console.log(selectedSeats);

  return (
    <div className={styles.seatGrid}>
      <div className={styles.priceList}>
        <div className={styles.priceLegend}>
          {Object.values(PRICING_TIERS).map(tier => (
            <div key={tier.label} className={styles.priceLegend}>
              <div className={`${styles.rounded} ${tier.label === 'Silver' ? styles.silver :
                  tier.label === 'Gold' ? styles.gold :
                    styles.platinum
                }`}></div>
              <span>{tier.label} - ₹{tier.price}</span>
            </div>
          ))}
        </div>
        {error && (
        <div className={styles.errorBox}>
          <span className={styles.errorIcon}>⚠️</span> {error}
        </div>
      )}
      </div>
      <div className={styles.screen}>SCREEN</div>
      <div className={styles.screenLine}></div>
      <div className={styles.seatWrapper}>
        {ROWS.map(row => {
          const tier = getPricingTier(row)
          return (
            <div key={row} className={styles.row}>
              <div className={styles.rowLabel}>{row}</div>
              {[...Array(SEATS_PER_ROW)].map((_, index) => {
                const seatId = `${row}${index + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={seatId}
                    onClick={() => toggleSeat(seatId)}
                    className={`
                    ${styles.seat}
                    ${styles[tier.label.toLowerCase()]}
                    ${isSelected ? styles.selected : ''}
                  `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeatGrid
