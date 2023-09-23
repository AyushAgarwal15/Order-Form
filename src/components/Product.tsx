interface ProductProps {
  id: number;
  imageSrc: string;
  productName: string;
  productPrice: number;
  handleOrder: (orderId: number) => void;
}

function Product({
  id,
  imageSrc,
  productName,
  productPrice,
  handleOrder,
}: ProductProps) {
  return (
    <div className="flex flex-col justify-center h-120 text-center bg-slate-100 m-3 px-7 py-4 w-50 rounded-lg  hover:bg-slate-200 transform transition-transform hover:scale-110 font-semibold size box-border">
      <img
        className="w-40 h-40 object-contain mb-2 border-2 border-black p-2 rounded-xl"
        src={imageSrc}
        alt={productName}
      />
      <div className="w-40 h-30 my-auto">
        {" "}
        <h1 className="text-xl md:text-2xl">{productName}</h1>
        <h2 className="text-xl font-bold my-2">Price /- {productPrice}</h2>
      </div>

      <button
        className="bg-black text-white px-6 py-2 rounded-full my-2 hover:cursor-pointer hover:bg-white hover:text-black font-bold text-md md:text-lg lg:text-xl"
        onClick={() => handleOrder(id)}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Product;
