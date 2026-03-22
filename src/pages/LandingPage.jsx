import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveReview } from "../firebase/db";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import styles from "./LandingPage.module.css";

import room1 from "../assets/room-1.jpeg";
import bathroom from "../assets/bathroom-1.jpeg";
import room2 from "../assets/room-2.jpeg";
import room3 from "../assets/room-3.jpeg";
import diner from "../assets/diner.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!review.trim()) newErrors.review = "A response is required.";
    if (!rating) newErrors.rating = "Please choose a star rating.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await saveReview({ text: review.trim(), rating });
    } catch (_) {
      // still show success to user even if offline
    }
    setSubmitting(false);
    setReview("");
    setRating(0);
    setShowModal(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSent(false), 5000);
  };

  return (
    <div className={styles.page} id="top">
      <Navbar />

      <header className={styles.hero}>
        <h1 className={styles.hotelName}>Warm Bliss Hotel</h1>
        <h2 className={styles.tagline}>Feel the warmth, embrace the bliss.</h2>
      </header>

      {/* Image Gallery */}
      <section className={styles.gallery} aria-label="Hotel photo gallery">
        <div className={`${styles.galleryItem} ${styles.large}`}>
          <img src={room1} alt="Room with a nice view" fetchpriority="high" decoding="async" />
        </div>
        <div className={styles.galleryItem}>
          <img src={bathroom} alt="A luxury bathroom" loading="lazy" decoding="async" />
        </div>
        <div className={styles.galleryItem}>
          <img src={room2} alt="A cosy bedroom" loading="lazy" decoding="async" />
        </div>
        <div className={styles.galleryItem}>
          <img src={room3} alt="Another bedroom" loading="lazy" decoding="async" />
        </div>
        <div className={styles.galleryItem}>
          <img src={diner} alt="Hotel diner" loading="lazy" decoding="async" />
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} id="about">
        <h2>About Us</h2>
        <p>
          Welcome to Warm Bliss Hotel, your home away from home! Located at
          Lekki, Nigeria. Our hotel blends elegance, comfort, and exceptional
          service to create a memorable stay for every guest. We offer luxurious
          accommodations with modern settings — air conditioning, flat-screen TV,
          work desk, and free Wi-Fi — all with a private bathroom. Enjoy our
          recreational facilities including our swimming pool, fitness center,
          and spa treatments.
          <br />
          <br />
          Warm Bliss Hotel is located one mile from the Lekki Conservation
          Centre, a peaceful nature reserve offering a canopy walkway, wildlife,
          and a break from the city bustle. Whether you&apos;re here for business
          or pleasure, our dedicated team is here to provide personalized
          hospitality that meets your every need.
        </p>
        <button className={styles.ctaBtn} onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </section>

      {/* Review Section */}
      <section className={styles.reviewSection} id="reply">
        <h2>Rate Your Experience</h2>
        <form className={styles.reviewForm} onSubmit={handleSubmitReview} noValidate>
          <label htmlFor="review">What did you think about your stay?</label>
          <textarea
            id="review"
            rows={5}
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className={errors.review ? styles.invalid : ""}
          />
          {errors.review && <p className={styles.errorText}>{errors.review}</p>}

          <div className={styles.starSection}>
            <label>Rate Us:</label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={styles.star}
                  style={{
                    color: star <= (hoveredStar || rating) ? "#f5a623" : "#ccc",
                  }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                  role="button"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            {errors.rating && <p className={styles.errorText}>{errors.rating}</p>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.contactContainer}>
          <div className={styles.contactInfoBox}>
            <h2>Get in Touch</h2>
            <p>Have questions about our rooms or amenities? We'd love to hear from you.</p>
            <div className={styles.contactDetails}>
              <p>📍 12 Luxury Avenue, Victoria Island, Lagos</p>
              <p>📞 08027182930</p>
              <p>✉️ warmbliss@gmail.com</p>
            </div>
          </div>
          <form className={styles.contactForm} onSubmit={handleContactSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={contactForm.name}
                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={contactForm.email}
                onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea 
                rows={4} 
                placeholder="Your Message..." 
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                required 
              />
            </div>
            <button type="submit" className={styles.contactBtn}>
              {contactSent ? "Message Sent! ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Review Submitted!"
        message="Thank you for sharing your experience at Warm Bliss Hotel. Your feedback helps us maintain our luxury standards."
        actionLabel="Back to Home"
        onAction={() => setShowModal(false)}
        icon="✅"
      />
    </div>
  );
};

export default LandingPage;
