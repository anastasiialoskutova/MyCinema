import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CinemaHall = ({ movieId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const bookings = await BookingService.getBookings(movieId);
      const allBookedSeats = bookings.flatMap((booking) => booking.seats);
      setBookedSeats(allBookedSeats);
    };

    fetchBookedSeats();
  }, [movieId]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const handleBookingSuccess = () => {
    setSelectedSeats([]);
    setShowForm(false);
    const updatedSeats = BookingService.getBookings(movieId).flatMap(
      (booking) => booking.seats
    );
    setBookedSeats(updatedSeats);
  };

  return (
    <div className="cinema-hall">
      <h2>Кінозал для фільму {movieId}</h2>
      <div className="seats-grid">
        {Array.from({ length: 30 }, (_, index) => index + 1).map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={
              bookedSeats.includes(seat)
                ? "seat booked"
                : selectedSeats.includes(seat)
                ? "seat selected"
                : "seat available"
            }
            disabled={bookedSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <>
          <p>Вибрані місця: {selectedSeats.join(", ")}</p>
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="book-button">Забронювати</button>
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
