import MovieList from "../components/MovieList";
import moviesData from '../data/movies'; 

const Home = () => {
  return (
    <div className="home">
      <h1>Головна сторінка</h1>
      <MovieList movies={moviesData} /> 
    </div>
  );
};

export default Home;
