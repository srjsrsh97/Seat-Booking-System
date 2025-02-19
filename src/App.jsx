import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './styles.module.css'
import SeatGrid from './components/SeatGrid'
import { BookingProvider } from './context'
import BookingSummary from './components/BookingSummary'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BookingProvider>
    <div className={styles.container}>
     <h1> Movie Theater Seat Booking </h1>
     <div className={styles.section}>
     <SeatGrid />
    <BookingSummary/>
    </div>
    </div>
    </BookingProvider>
  )
}

export default App
