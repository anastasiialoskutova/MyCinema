import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CinemaHall = ({ movieId }) => {
  // Стан для збереження вибраних місць користувачем
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Стан для збереження вже заброньованих місць
  const [bookedSeats, setBookedSeats] = useState([]);

  // Показ/приховування форми бронювання
  const [showForm, setShowForm] = useState(false);

  // Отримання заброньованих місць з BookingService при завантаженні компонента
  useEffect(() => {
    const fetchBookedSeats = async () => {
      const bookings = await BookingService.getBookings(movieId);
      const allBookedSeats = bookings.flatMap((booking) => booking.seats); // Об'єднання всіх масивів місць
      setBookedSeats(allBookedSeats);
    };

    fetchBookedSeats();
  }, [movieId]);

  // Обробка натискання на місце
  const handleSeatClick = (seatNumber) => {
    // Якщо місце вже заброньоване — нічого не робити
    if (bookedSeats.includes(seatNumber)) return;

    // Якщо місце вже вибране — прибрати його, інакше додати
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  // Оновлення стану після успішного бронювання
  const handleBookingSuccess = () => {
    setSelectedSeats([]);
    setShowForm(false);

    // Оновити список заброньованих місць після бронювання
    const updatedSeats = BookingService.getBookings(movieId).flatMap(
      (booking) => booking.seats
    );
    setBookedSeats(updatedSeats);
  };

  return (
    <div className="cinema-hall">
      <h2>Кінозал для фільму {movieId}</h2>

      {/* Сітка місць */}
      <div className="seats-grid">
        {Array.from({ length: 30 }, (_, index) => index + 1).map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={
              bookedSeats.includes(seat)
                ? "seat booked" // темно-жовте місце
                : selectedSeats.includes(seat)
                ? "seat selected" //  біле місце
                : "seat available" // жовте місце
            }
            disabled={bookedSeats.includes(seat)} // вимкнути кнопку, якщо місце заброньоване
          >
            {seat}
          </button>
        ))}
      </div>

      {/* Вивід списку вибраних місць і форма бронювання */}
      {selectedSeats.length > 0 && (
        <>
          <p>Вибрані місця: {selectedSeats.join(", ")}</p>
          
          {/* Показати форму в залежності від showForm */}
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="book-button">
              Забронювати
            </button>
          ) : (
            <BookingForm
              movieId={movieId}
              selectedSeats={selectedSeats}
              onSuccess={handleBookingSuccess}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CinemaHall;
