import { useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "../api/productsApi";
import OrderTable from "./OrderTable";

function ProductSearchFilter() {
  interface Product {
    id: number;
    productName: string;
    price: number;
  }

  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  // Function to handle item selection
  const handleItemSelect = (item: Product) => {
    if (!selectedItems.includes(item))
      setSelectedItems([...selectedItems, item]);
    setSearch("");
  };

  // Function to delete selected item
  const handleDeleteSelectedItem = (id: number) => {
    alert("Do you really want to delete this item?");
    const selectedItemsAfterDeleting = selectedItems.filter(
      (item) => item.id !== id
    );
    setSelectedItems(selectedItemsAfterDeleting);
  };

  // Function to reset Selected items
  const resetSelectedItems = () => {
    setSelectedItems([]);
  };

  // Use React Query to fetch products
  const {
    isLoading,
    isError,
    error,
    data: products,
  } = useQuery("products", getProducts);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  // Function to filter products based on search query
  const filteredProducts = products.filter((product: Product) =>
    product.productName.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <main className="input-table-container1">
      <div className="input-table-container2">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {search && filteredProducts.length > 0 && (
          <ul className="product-suggestion-list">
            {filteredProducts?.map((searchedProduct: Product) => (
              <li
                key={searchedProduct.id}
                className="product-suggestion-list-item "
                onClick={() => handleItemSelect(searchedProduct)}
              >
                {searchedProduct.productName}
              </li>
            ))}
          </ul>
        )}
        {selectedItems.length > 0 && (
          <OrderTable
            selectedItems={selectedItems}
            handleDeleteSelectedItem={handleDeleteSelectedItem}
            resetSelectedItems={resetSelectedItems}
          />
        )}
      </div>
    </main>
  );
}

export default ProductSearchFilter;
