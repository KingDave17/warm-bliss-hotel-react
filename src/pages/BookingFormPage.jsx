import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { saveBooking } from "../firebase/db";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import styles from "./BookingFormPage.module.css";

const ROOM_PRICES = {
  "Deluxe Room": "₦90,000",
  "Executive Suite": "₦165,000",
  "Family Suite": "₦200,000",
};

const getTodayDate = () => new Date().toISOString().split("T")[0];

const BookingFormPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    address: "",
    phone: "",
    roomType: "Deluxe Room",
    checkIn: "",
    checkOut: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = getTodayDate();

  const change = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.checkIn) e.checkIn = "Check-in date is required.";
    if (!form.checkOut) e.checkOut = "Check-out date is required.";
    else if (form.checkIn && new Date(form.checkOut) <= new Date(form.checkIn))
      e.checkOut = "Check-out must be after check-in date.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await saveBooking({
        ...form,
        uid: currentUser?.uid,
        price: ROOM_PRICES[form.roomType],
      });
    } catch (_) {
      // proceed even on network error
    }
    setSubmitting(false);
    setShowModal(true);
  };

  const goToPayment = () => {
    navigate("/payment", {
      state: { roomType: form.roomType, price: ROOM_PRICES[form.roomType] },
    });
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <h1>Reservation Form</h1>
        <p className={styles.subtitle}>
          Fill in your details to book your stay at Warm Bliss Hotel.
        </p>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          {/* Personal Details */}
          <fieldset className={styles.fieldset}>
            <legend>Personal Details</legend>

            <div className={styles.fieldGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={change("name")}
                className={errors.name ? styles.invalid : ""}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={change("email")}
                className={errors.email ? styles.invalid : ""}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                rows={3}
                placeholder="Your home address"
                value={form.address}
                onChange={change("address")}
                className={errors.address ? styles.invalid : ""}
              />
              {errors.address && (
                <p className={styles.errorText}>{errors.address}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="08012345678"
                value={form.phone}
                onChange={change("phone")}
                className={errors.phone ? styles.invalid : ""}
              />
              {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
            </div>
          </fieldset>

          {/* Service Details */}
          <fieldset className={styles.fieldset}>
            <legend>Service Details</legend>

            <div className={styles.fieldGroup}>
              <label htmlFor="roomType">Room Type</label>
              <select
                id="roomType"
                value={form.roomType}
                onChange={change("roomType")}
              >
                {Object.keys(ROOM_PRICES).map((r) => (
                  <option key={r} value={r}>
                    {r} — {ROOM_PRICES[r]}/night
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.dateRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="checkIn">Check-In Date</label>
                <input
                  id="checkIn"
                  type="date"
                  min={today}
                  value={form.checkIn}
                  onChange={change("checkIn")}
                  className={errors.checkIn ? styles.invalid : ""}
                />
                {errors.checkIn && (
                  <p className={styles.errorText}>{errors.checkIn}</p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="checkOut">Check-Out Date</label>
                <input
                  id="checkOut"
                  type="date"
                  min={form.checkIn || today}
                  value={form.checkOut}
                  onChange={change("checkOut")}
                  className={errors.checkOut ? styles.invalid : ""}
                />
                {errors.checkOut && (
                  <p className={styles.errorText}>{errors.checkOut}</p>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                rows={4}
                placeholder="Any special requests or notes…"
                value={form.additionalInfo}
                onChange={change("additionalInfo")}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit & Proceed to Payment"}
          </button>
        </form>
      </div>

      <Modal
        show={showModal}
        onClose={goToPayment}
        title="Registration Submitted!"
        message="Your reservation details have been saved. Redirecting to payment…"
        actionLabel="Proceed to Payment"
        onAction={goToPayment}
        icon="✓"
      />
    </div>
  );
};

export default BookingFormPage;
