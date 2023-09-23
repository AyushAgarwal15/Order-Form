interface ProductSearchFilterProps {
  search: string;
  handleSearch: (value: string) => void;
}

function ProductSearchFilter({
  search,
  handleSearch,
}: ProductSearchFilterProps) {
  return (
    <div className="flex justify-center my-6 w-full">
      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="block text-2xl text-gray-500 border-2 border-black px-4 py-2 rounded-full w-80 md:w-1/2 text-center"
      />
    </div>
  );
}

export default ProductSearchFilter;
