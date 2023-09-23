import axios from "axios";
import { useState, useEffect } from "react";
import OrderedProduct from "./OrderedProduct";

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
  orderId: number[];
  data: Product[] | null;
  quantity: number;
  handleDeleteOrder: (id: number) => void;
}

function OrderTable({ orderId, data, handleDeleteOrder }: OrderTableProps) {
  const filteredProducts = data?.filter((product) =>
    orderId.includes(product.id)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (filteredProducts) {
      const total = filteredProducts.reduce(
        (acc, product) => acc + product.price,
        0
      );
      setTotalPrice(total);
    }
  }, [filteredProducts]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Formating data into the desired structure
      const ordersData = filteredProducts?.map((product) => ({
        productName: product.productName,
        price: product.price,
      }));

      const orderPromises = ordersData?.map((order) =>
        axios.post("http://localhost:3000/orders", order)
      );

      const responses = await Promise.all(orderPromises || []);

      console.log(responses);

      if (responses.every((response) => response.status === 201)) {
        await axios.post("http://localhost:3000/totalPrice", {
          totalPrice: totalPrice,
        });
        alert("Orders submitted successfully!");
      } else {
        alert("Failed to submit one or more orders.");
      }
    } catch (error) {
      alert("An error occurred while submitting the order data.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    orderId.length && (
      <>
        {" "}
        <table className="table-fixed w-5/6 mx-auto my-8 text-center border-2 border-black">
          <thead className="bg-gray-200 text-lg md:text-xl lg:text-2xl font-bold">
            <tr className="border-2 border-black">
              <th className="border-r-2 border-black p-2 w-34">Name</th>
              <th className="border-r-2 border-black p-2 w-34">Details</th>
              <th className="border-r-2 border-black p-2 w-34">Time</th>
              <th className="border-r-2 border-black p-2 w-34">Price</th>
              <th className="p-2 w-34">Del</th>
            </tr>
          </thead>
          <tbody className="text-md md:text-lg lg:text-xl text-gray-800 ">
            {filteredProducts?.map((product) => (
              <OrderedProduct
                key={product.id}
                productName={product.productName}
                productDetails={product.productDetails}
                dispatchTime={product.dispatchTime}
                price={product.price}
                productId={product.id}
                handleDeleteOrder={handleDeleteOrder}
              />
            ))}
            <tr className="bg-gray-100 font-bold">
              <td colSpan={3} className="text-xl md:text-2xl text-black  p-4">
                Total Price =
              </td>
              <td colSpan={2} className="text-xl p-4">
                {totalPrice !== null && (
                  <p className="text-xl font-semibold text-center">
                    {totalPrice}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {isSubmitting ? (
          <p className="text-2xl font-bold text-center pb-10">
            Submitting orders...
          </p>
        ) : (
          <button
            onClick={() => handleSubmit()}
            className="bg-black px-14 py-4 rounded-full text-white text-2xl
           font-bold w-60 text-center block mx-auto my-6 hover:cursor-pointer transform transition-transform hover:scale-110"
          >
            Submit
          </button>
        )}
      </>
    )
  );
}

export default OrderTable;
