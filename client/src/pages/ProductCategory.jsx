import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16 ">
      {searchCategory && (
        <div className="flex flex-col gap-2 mb-10  w-max">
          <p className="text-2xl font-medium ">{searchCategory.text}</p>
          <div className="w-30 h-1 bg-primary rounded-full"></div>
        </div>
      )}
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="flex flex-col col-span-5 items-center justify-center text-center py-24 px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-500 max-w-md">
              We couldn’t find any products matching your criteria. Try
              adjusting your filters or search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
