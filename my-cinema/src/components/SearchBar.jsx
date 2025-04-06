const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <input
      type="text"
      placeholder="Пошук фільму..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
  
  export default SearchBar;
  