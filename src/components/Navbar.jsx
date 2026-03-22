import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLanding = pathname === "/";

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logoWrap}>
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Warm Bliss Hotel Logo" className={styles.logo} />
        </Link>
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        {isLanding ? (
          <>
            <li><Link to="/#about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/#reply" onClick={closeMenu}>Leave a Review</Link></li>
            <li><Link to="/#contact" onClick={closeMenu}>Contact Us</Link></li>
            {!currentUser ? (
              <li><Link to="/signin" className={styles.signinLink} onClick={closeMenu}>Sign In</Link></li>
            ) : (
              <li><Link to="/dashboard" className={styles.signinLink} onClick={closeMenu}>Dashboard</Link></li>
            )}
          </>
        ) : (
          <>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            {currentUser && (
              <>
                <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/bookings" onClick={closeMenu}>My Bookings</Link></li>
                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                <li><Link to="/book" onClick={closeMenu}>Book Room</Link></li>
                <li>
                  <button className={styles.signOutBtn} onClick={handleLogout}>
                    Sign Out
                  </button>
                </li>
              </>
            )}
            {!currentUser && (
              <li><Link to="/signin" className={styles.signinLink} onClick={closeMenu}>Sign In</Link></li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
