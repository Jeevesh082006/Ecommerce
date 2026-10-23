import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectTotalItems,
} from "../features/cart/cartSlice";

import {
  selectWishlistCount,
} from "../features/wishlist/wishlistSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = useSelector(selectTotalItems);

  const wishlistCount = useSelector(
    selectWishlistCount
  );

  const user = JSON.parse(
    localStorage.getItem("shopkartUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("shopkartUser");
    navigate("/");
  };

  return (
    <header className="header">

      <div className="header-container">

        <Link to="/" className="logo">
          ShopKart
        </Link>

        <nav className="nav">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active"
                : ""
            }
          >
            Products
          </Link>

          <Link
            to="/wishlist"
            className={
              location.pathname === "/wishlist"
                ? "active"
                : ""
            }
          >
            ❤️ Wishlist

            {wishlistCount > 0 && (
              <span className="header-badge">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={
              location.pathname === "/cart"
                ? "active"
                : ""
            }
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="header-badge">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span className="user-name">
                👤 {user.email}
              </span>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="login-link"
            >
              🔐 Login
            </Link>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Header;