const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <input
      type="text"
      placeholder="Пошук фільму..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} //e.target - це елемент, який викликав подію (input)
    />
  );
  
  export default SearchBar;
  