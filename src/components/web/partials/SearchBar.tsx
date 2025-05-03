import { SearchIcon } from "../../../utils/Icons";

export default function SearchBar() {

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
  return (
    <form
      className="flex justify-center items-center p-2 gap-2"
      onSubmit={handleSearchFormSubmit}
    >
      <input
        type="search"
        name="keywords"
        id="keywords"
        placeholder="Buscar productos, marcas..."
        autoComplete="off"
        autoCapitalize="off"
        className="p-2 bg-white rounded-xl"
      />
      <button type="submit" className="p-3 rounded-xl bg-yellow-500">
        <SearchIcon />
      </button>
    </form>
  );
}
