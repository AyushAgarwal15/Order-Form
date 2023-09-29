import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { useMutation } from "react-query";
import { addOrder } from "../api/productsApi";

// Define your interfaces
interface ProductDetails {
  brand: string;
  model: string;
}

interface Product {
  id: number;
  productName: string;
  productDetails: ProductDetails;
  dispatchTime: string;
  price: number;
}

interface OrderTableProps {
  selectedItems: Product[] | null;
  handleDeleteSelectedItem: (id: number) => void;
  resetSelectedItems: () => void;
}

interface OrderSummary {
  products: {
    productName: string;
    price: number;
  }[];
  totalPrice: number;
}

function OrderTable({
  selectedItems,
  handleDeleteSelectedItem,
  resetSelectedItems,
}: OrderTableProps) {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  // Function to handle OrderTable Submit (post data to json server)
  const handleSubmit = () => {
    if (selectedItems) {
      // Calculate the total price
      const total = selectedItems.reduce(
        (acc, product) => acc + product.price,
        0
      );

      // Create an order summary object
      const orderSummary: OrderSummary = {
        products: selectedItems.map((product) => ({
          productName: product.productName,
          price: product.price,
        })),
        totalPrice: total,
      };

      // Call the mutation function to add the order
      addOrderMutation.mutate(orderSummary);
    }
  };

  const addOrderMutation = useMutation(
    (newOrder: OrderSummary) => addOrder(newOrder),
    {
      onSuccess: (response) => {
        // Handle success
        alert("Orders submitted successfully");
        console.log("Order submitted successfully:", response);
        resetSelectedItems();
      },
      onError: (error) => {
        // Handle error
        alert("Error submitting order");
        console.error("Error submitting order:", error);
      },
    }
  );

  useEffect(() => {
    if (selectedItems) {
      const total = selectedItems.reduce(
        (acc, product) => acc + product.price,
        0
      );
      setTotalPrice(total);
    }
  }, [selectedItems]);

  const columns: Column<Product>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "productName",
        sortType: "alphanumeric",
      },
      {
        Header: "Details",
        accessor: (row: Product) => (
          <ul>
            <li>Brand: {row.productDetails.brand}</li>
            <li>Model: {row.productDetails.model}</li>
          </ul>
        ),
      },
      {
        Header: "Time",
        accessor: "dispatchTime",
        sortType: "alphanumeric",
      },
      {
        Header: "Price",
        accessor: "price",
        sortType: "basic",
      },
      {
        Header: "Del",
        accessor: "id",
        Cell: ({ value }: { value: number }) => (
          <span
            className="text-red-700 text-3xl font-bold hover:cursor-pointer"
            onClick={() => handleDeleteSelectedItem(value)}
          >
            X
          </span>
        ),
      },
    ],
    [handleDeleteSelectedItem]
  );

  const data = useMemo(() => selectedItems || [], [selectedItems]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
          <tr className="total-price-row">
            <td colSpan={2} className="total-price-row-data">
              Total Price =
            </td>
            <td colSpan={3} className="total-price-row-data">
              {totalPrice !== null && <p>{totalPrice}</p>}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default OrderTable;
