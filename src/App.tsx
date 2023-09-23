import { useState } from "react";
import useFetch from "./components/custom-hooks/useFetch";
import "./App.css";
import Header from "./components/Header";
import SideBarMenu from "./components/SideBarMenu";
import SearchFilter from "./components/ProductSearchFilter";
import Products from "./components/Products";
import AddToTable from "./components/OrderTable";

export default function App() {
  const { data, isPending, error } = useFetch("http://localhost:3000/products");

  const [isHamburgerClicked, setIsHamburgerClicked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [orderId, setOrderId] = useState<number[]>([]);

  function handleMenu() {
    setIsHamburgerClicked((prev) => !prev);
  }

  function handleSearch(value: string) {
    setSearch(value);
  }

  function handleOrder(id: number) {
    setOrderId([...orderId, id]);
  }

  function handleDeleteOrder(id: number) {
    alert("Do you really want to delete this Order?");
    const OrderIdArrayAfterDeletingAnItem = orderId.filter(
      (orderId) => orderId !== id
    );
    setOrderId(OrderIdArrayAfterDeletingAnItem);
  }

  return (
    <>
      <Header isHamburgerClicked={isHamburgerClicked} handleMenu={handleMenu} />
      <div className="flex flex-col md:flex-row flex-grow">
        {isHamburgerClicked && <SideBarMenu />}
        <div className="flex flex-col items-center justify-center flex-grow">
          <SearchFilter search={search} handleSearch={handleSearch} />
          <Products
            search={search}
            handleOrder={handleOrder}
            data={data}
            isPending={isPending}
            error={error}
          />
        </div>
      </div>
      <AddToTable
        orderId={orderId}
        data={data}
        handleDeleteOrder={handleDeleteOrder}
      />
    </>
  );
}
