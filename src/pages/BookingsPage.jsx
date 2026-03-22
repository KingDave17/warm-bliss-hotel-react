import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserPayments } from "../firebase/db";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./BookingsPage.module.css";

const BookingsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getUserPayments(currentUser?.uid);
        setPayments(data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) fetchPayments();
  }, [currentUser]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Pending";
    const date = timestamp.toDate ? timestamp.toDate() : new Date();
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Bookings</h1>
          <p>View and manage all your reservations at Warm Bliss Hotel.</p>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading your history...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No bookings found</h2>
            <p>You haven't made any reservations with us yet.</p>
            <button className={styles.bookBtn} onClick={() => navigate("/dashboard")}>
              Explore Rooms
            </button>
          </div>
        ) : (
          <div className={styles.bookingsList}>
            {payments.map((booking) => (
              <div key={booking.id} className={styles.bookingCard}>
                <div className={styles.cardHeader}>
                  <h3>{booking.roomType}</h3>
                  <span className={`${styles.statusBadge} ${styles[booking.status]}`}>
                    {booking.status === "succeeded" ? "Confirmed" : "Processing"}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.detail}>
                    <span className={styles.label}>Amount Paid:</span>
                    <span className={styles.value}>{booking.price}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Date Booked:</span>
                    <span className={styles.value}>{formatDate(booking.createdAt)}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Reference #</span>
                    <span className={styles.valueRef}>{booking.reference || booking.id.substring(0, 8)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingsPage;
