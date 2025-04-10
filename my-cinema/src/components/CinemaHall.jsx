import { useState } from 'react';

const CinemaHall = ({ movieId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber) // Якщо вже вибрано, зняти
        : [...prevSeats, seatNumber] // Якщо не вибрано, додати
    );
  };

  const seats = Array.from({ length: 30 }, (_, index) => index + 1); // Створюємо сітку з 30 місць

  return (
    <div className="cinema-hall">
      <h2>Кінозал для фільму {movieId}</h2>
      <div className="seats-grid">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={selectedSeats.includes(seat) ? 'seat booked' : 'seat available'}
          >
            {seat}
          </button>
        ))}
      </div>
      <p>Вибрані місця: {selectedSeats.join(', ')}</p>
    </div>
  );
};

export default CinemaHall;
