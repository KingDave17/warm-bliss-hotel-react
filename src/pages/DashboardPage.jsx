import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import styles from "./DashboardPage.module.css";

import heroImg from "../assets/hall.jpg";
import bedImg from "../assets/bed-1.jpeg";
import execImg from "../assets/executive-suite.jpg";
import familyImg from "../assets/family-suite.jpg";
import spaImg from "../assets/spa.jpg";
import poolImg from "../assets/pool.jpg";
import barImg from "../assets/bar.jpg";
import restaurantImg from "../assets/restaurant.jpg";
import cafeImg from "../assets/cafe.jpg";
import sportsImg from "../assets/sports.jpg";
import gymImg from "../assets/gym.jpg";
import clubImg from "../assets/club.jpg";

const ROOMS = [
  {
    img: bedImg,
    name: "Deluxe Room",
    desc: "King-size bed, free WiFi, complimentary breakfast, and stunning city view.",
    price: "₦90,000/night",
  },
  {
    img: execImg,
    name: "Executive Suite",
    desc: "Spacious living area, premium toiletries, free WiFi, and access to the VIP lounge.",
    price: "₦165,000/night",
  },
  {
    img: familyImg,
    name: "Family Suite",
    desc: "Two bedrooms, a mini kitchen, free WiFi, and a balcony with a scenic view.",
    price: "₦200,000/night",
  },
];

const ATTRACTIONS = [
  { img: spaImg, label: "Spa" },
  { img: poolImg, label: "Pool" },
  { img: barImg, label: "Bar" },
  { img: restaurantImg, label: "On-site Restaurant" },
  { img: cafeImg, label: "Café" },
  { img: sportsImg, label: "Sports & Games" },
  { img: gymImg, label: "Gym" },
  { img: clubImg, label: "Night Club" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const displayName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Guest";

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.welcome}>Welcome back, {displayName} 👋</p>
          <h1 className={styles.heroTitle}>Warm Bliss Hotel</h1>
          <p className={styles.heroSub}>Experience Luxury, Comfort, and Warmth</p>
          <p className={styles.heroDesc}>
            Your ultimate destination for relaxation and indulgence in the heart
            of Lekki
          </p>
          <button className={styles.heroBtn} onClick={() => navigate("/book")}>
            Book Your Stay
          </button>
        </div>
      </div>

      {/* Rooms */}
      <section className={styles.rooms} id="room">
        <h2>Our Rooms</h2>
        {ROOMS.map((room) => (
          <div className={styles.card} key={room.name} onClick={() => navigate("/book")}>
            <img src={room.img} alt={room.name} loading="lazy" decoding="async" />
            <div className={styles.cardBody}>
              <h3>{room.name}</h3>
              <p>{room.desc}</p>
              <p className={styles.price}>{room.price}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Attractions */}
      <section className={styles.attractionsSection} id="attractions">
        <h2>Other Attractions</h2>
        <p className={styles.attractionsSub}>
          Enjoy our world-class amenities during your stay
        </p>
        <div className={styles.attractionsGrid}>
          {ATTRACTIONS.map((a) => (
            <div className={styles.attractionItem} key={a.label}>
              <img src={a.img} alt={a.label} loading="lazy" decoding="async" />
              <div className={styles.attractionLabel}>{a.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.bookCta}>
          <button className={styles.bookBtn} onClick={() => navigate("/book")}>
            Register & Book
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
