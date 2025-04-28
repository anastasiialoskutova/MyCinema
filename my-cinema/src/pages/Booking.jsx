import { useParams } from 'react-router-dom';
import CinemaHall from "../components/CinemaHall";

const Booking = () => {
  // Отримуємо параметр `id` з URL — це id фільму
  const { id } = useParams();

  return (
    <div className="booking">
      <h1>Сторінка бронювання</h1>

      {/* Передаємо movieId в компонент CinemaHall для завантаження відповідних місць */}
      <CinemaHall movieId={id} />
    </div>
  );
};

export default Booking;
