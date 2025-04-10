import { useParams } from 'react-router-dom';
import CinemaHall from './CinemaHall';

const Booking = () => {
  const { id } = useParams(); // Отримуємо id фільму з параметрів URL

  return (
    <div className="booking">
      <h1>Сторінка бронювання</h1>
      <CinemaHall movieId={id} />
    </div>
  );
};

export default Booking;
