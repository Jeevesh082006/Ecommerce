import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard";

import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "./productsSlice";

function ProductsList() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");

  // CATEGORY
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  // SORT
  const [sortOrder, setSortOrder] =
    useState("default");

  // PRICE RANGE
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch products
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Categories
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products.map((product) => product.category)
      ),
    ];
  }, [products]);

  // Search + Category + Price + Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // SEARCH FILTER
    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // CATEGORY FILTER
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    // MINIMUM PRICE
    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >= Number(minPrice)
      );
    }

    // MAXIMUM PRICE
    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <= Number(maxPrice)
      );
    }

    // SORT PRICE LOW TO HIGH
    if (sortOrder === "low-high") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    // SORT PRICE HIGH TO LOW
    if (sortOrder === "high-low") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    sortOrder,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOrder("default");
    setMinPrice("");
    setMaxPrice("");
  };

  // Loading
  if (status === "loading") {
    return (
      <main className="page-container">
        <div className="loading">
          Loading products...
        </div>
      </main>
    );
  }

  // Error
  if (status === "failed") {
    return (
      <main className="page-container">
        <div className="error-message">

          <h2>
            Unable to load products
          </h2>

          <p>{error}</p>

          <button
            className="add-button"
            onClick={() =>
              dispatch(fetchProducts())
            }
          >
            Try Again
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="page-container">

      {/* HERO */}
      <section className="hero-section">

        <div>
          <h1>ShopKart</h1>

          <p>
            Discover amazing products at great prices.
          </p>
        </div>

        <div className="hero-discount">
          10% OFF
        </div>

      </section>

      {/* SEARCH BAR */}
      <div className="search-container">

        <span className="search-icon">
          🔎
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        {searchTerm && (
          <button
            className="clear-search"
            onClick={() =>
              setSearchTerm("")
            }
          >
            ✕
          </button>
        )}

      </div>

      {/* PRODUCT FILTER HEADER */}
      <section className="filter-section">

        <div className="filter-top">

          <div>
            <h2>Products</h2>

            <p>
              {filteredProducts.length} products found
            </p>
          </div>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
            className="sort-select"
          >
            <option value="default">
              Sort by Price
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>
          </select>

        </div>

        {/* CATEGORY CHIPS */}
        <div className="category-chips">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-chip active"
                  : "category-chip"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

        {/* PRICE RANGE */}
        <div className="price-filter">

          <div className="price-filter-title">
            💰 Price Range
          </div>

          <div className="price-inputs">

            <div className="price-input-group">

              <label>
                Minimum Price
              </label>

              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
              />

            </div>

            <span className="price-separator">
              —
            </span>

            <div className="price-input-group">

              <label>
                Maximum Price
              </label>

              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
              />

            </div>

            <button
              className="clear-filter-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (

        <div className="no-products">

          <h2>
            No products found
          </h2>

          <p>
            Try changing your search or filters.
          </p>

          <button
            className="add-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      )}

    </main>
  );
}

export default ProductsList;