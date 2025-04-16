const saveBooking = (movieId, bookingData) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    if (!bookings[movieId]) bookings[movieId] = [];
  
    bookings[movieId].push(bookingData); // додаємо одне бронювання
    localStorage.setItem("bookings", JSON.stringify(bookings));
  };
  
  const getBookings = (movieId) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    return bookings[movieId] || [];
  };
  
  export default {
    saveBooking,
    getBookings,
  };
  