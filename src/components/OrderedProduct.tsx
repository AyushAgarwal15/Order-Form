interface ProductDetails {
  brand: string;
  model: string;
}

interface OrderedProductProps {
  productName: string;
  productDetails: ProductDetails;
  dispatchTime: string;
  price: number;
  productId: number;
  handleDeleteOrder: (id: number) => void;
}

function OrderedProduct({
  productName,
  productDetails,
  dispatchTime,
  price,
  productId,
  handleDeleteOrder,
}: OrderedProductProps) {
  return (
    <tr className="border-2 border-black">
      <td className="border-r-2 border-black p-2">{productName}</td>
      <td className="border-r-2 border-black p-2">
        <ul className="w-34">
          <li>Brand: {productDetails?.brand}</li>
          <li>Model: {productDetails?.model}</li>
        </ul>
      </td>
      <td className="border-r-2 border-black p-2">{dispatchTime}</td>
      <td className="border-r-2 border-black p-2">{price}</td>
      <td className="transform transition-transform hover:scale-150">
        <span
          className="text-red-700 text-3xl font-bold hover:cursor-pointer"
          onClick={() => handleDeleteOrder(productId)}
        >
          X
        </span>
      </td>
    </tr>
  );
}

export default OrderedProduct;
