import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, currency, addToCart, navigate } = useAppContext();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Find the product once products are available
  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  // Set thumbnail and related products once product is found
  useEffect(() => {
    if (product) {
      setThumbnail(product?.image[0] || null);

      const related = products
        .filter(
          (item) =>
            item._id !== product._id && item.category === product.category
        )
        .slice(0, 5);

      setRelatedProducts(related);
    }
  }, [product, products]);

  if (!product)
    return (
      <h1 className="mt-10 text-center text-lg">Loading product details...</h1>
    );

  return (
    <div className="mt-12">
      <p className="text-gray-500">
        <Link to="/">Home</Link> /<Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {" "}
          {product.category}
        </Link>{" "}
        / <span className="text-primary"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Product Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((img, i) => (
              <div
                key={i}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-4 w-3.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p className="text-base ml-2">4</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.discription.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 flex flex-col items-center ">
          <h2 className="text-3xl font-medium text-center mb-2">
            Related Products
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-12 py-2.5  mx-auto transition border mt-4 hover:bg-primary/10 cursor-pointer hover:scale-105 text-primary rounded font-medium"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
