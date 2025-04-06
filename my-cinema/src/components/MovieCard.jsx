const MovieCard = ({ movie }) => {
    return (
      <div className="movie-card">
        <img src={movie.poster} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p><strong>Жанр:</strong> {movie.genre}</p>
        <p><strong>Сеанс:</strong> {movie.time}</p>
      </div>
    );
  };
  
  export default MovieCard;
  