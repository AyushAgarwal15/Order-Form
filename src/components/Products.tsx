import Product from "./Product";

interface Product {
  id: number;
  productName: string;
  details: {
    brand: string;
    model: string;
  };
  dispatchTime: string;
  price: number;
  productImage: string;
}

interface Search {
  search: string;
  handleOrder: (orderId: number) => void;
  data: Product[] | null;
  isPending: boolean;
  error: string | null;
}

function Products({ search, handleOrder, data, isPending, error }: Search) {
  if (isPending) {
    return <p className="text-3xl flex justify-center">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 font-bold text-3xl bg-black p-4">
        {error} :{"("}
      </p>
    );
  }

  if (!data) {
    return null; // Handle the case when data is null
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data
        .filter((product) =>
          product.productName.toLowerCase().includes(search.toLowerCase())
        )
        .map((product) => (
          <Product
            key={product.id}
            id={product.id}
            imageSrc={product.productImage}
            productName={product.productName}
            productPrice={product.price}
            handleOrder={handleOrder}
          />
        ))}
    </div>
  );
}

export default Products;
