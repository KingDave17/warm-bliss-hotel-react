import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useAuth } from "../context/AuthContext";
import { savePayment } from "../firebase/db";
import Navbar from "../components/Navbar";
import styles from "./PaymentPage.module.css";

// ─── Paystack Public Key ──────────────────────────────────────────────────
// Replace with your own test key from dashboard.paystack.com
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Helper to convert "₦90,000/night" to an integer 90000
const getNumericPrice = (priceStr) => {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
};

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [processing, setProcessing] = useState(false);

  // Fallbacks if user navigates directly without booking state
  const roomType = state?.roomType || "Deluxe Room";
  const price = state?.price || "₦90,000";

  // Paystack config
  const numericPrice = getNumericPrice(price) || 0;
  const amountInKobo = numericPrice * 100; // Paystack expects lowest currency unit

  const config = {
    reference: new Date().getTime().toString(),
    email: currentUser?.email || "guest@example.com",
    amount: amountInKobo,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
    metadata: {
      roomType,
      uid: currentUser?.uid || "guest",
    },
  };

  const onSuccess = (reference) => {
    setProcessing(true);

    // Fire and forget Firestore save
    savePayment({
      uid: currentUser?.uid,
      email: currentUser?.email || "guest@example.com",
      roomType,
      price,
      reference: reference.reference,
      status: "succeeded",
      mode: "paystack_test",
    }).catch((err) => console.log("Background save failed:", err));

    // Instantaneous redirect
    navigate("/dashboard");
  };

  const onClose = () => {
    console.log("Paystack payment window closed.");
  };

  const componentProps = {
    ...config,
    text: processing ? "Finalizing…" : `Pay ${price} with Paystack`,
    onSuccess,
    onClose,
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.wrapper}>
        {/* Order Summary */}
        <div className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <span>Room Type</span>
              <strong>{roomType}</strong>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}>
              <span>Amount Due</span>
              <strong className={styles.amount}>{price}</strong>
            </div>
          </div>
          <p className={styles.secureNote}>
            🔒 Secured by Paystack — Africa's premier payment gateway.
          </p>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/book")}
          >
            ← Change Room
          </button>
        </div>

        {/* Payment Action */}
        <div className={styles.formSection}>
          <h1>Complete Your Booking</h1>
          <p className={styles.subtitle}>
            You will be redirected securely to Paystack to complete your payment.
          </p>

          <div className={styles.payActionCard}>
            <p className={styles.actionNote}>
              Click the button below to pay securely via card, bank transfer, or USSD using Paystack.
            </p>
            <PaystackButton
              {...componentProps}
              className={styles.payBtn}
              disabled={processing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
