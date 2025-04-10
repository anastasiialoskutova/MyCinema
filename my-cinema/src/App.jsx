import { useState } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import moviesData from './data/movies'; // Імпорт даних фільмів з файлу movies.js

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = moviesData.filter(movie => //filteredMovies - новий масив з відфільтрованими фільмами
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1 id="logo">Кінотеатр</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
