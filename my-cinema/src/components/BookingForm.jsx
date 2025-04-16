import { useState } from "react";
import { toast } from "react-toastify";
import BookingService from "../services/BookingService";

const BookingForm = ({ movieId, selectedSeats, onSuccess }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      setError("Усі поля обов'язкові!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Невірний формат email!");
      return;
    }

    const booking = {
      name,
      phone,
      email,
      seats: selectedSeats,
    };

    BookingService.saveBooking(movieId, booking);
    toast.success("Бронювання успішно збережено!");

    // Очистка
    setName("");
    setPhone("");
    setEmail("");
    setError("");
    onSuccess(); // повідомити CinemaHall
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
  {error && <p>{error}</p>}
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Ім'я"
    required
    className="form-input"
  />
  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Телефон"
    required
    className="form-input"
  />
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Емейл"
    required
    className="form-input"
  />
  <button type="submit" className="form-button">
    Підтвердити бронювання
  </button>
</form>

  );
};

export default BookingForm;
