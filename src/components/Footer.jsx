import styles from "./Footer.module.css";
import phoneIcon from "../assets/icon-phone.svg";
import emailIcon from "../assets/icon-email.svg";

const Footer = () => (
  <footer className={styles.footer} id="contact">
    <div className={styles.grid}>
      <div className={styles.brand}>
        <p className={styles.brandName}>Warm Bliss Hotel</p>
        <p className={styles.contactItem}>
          <img src={phoneIcon} alt="phone" />
          <span>08027182930</span>
        </p>
        <p className={styles.contactItem}>
          <img src={emailIcon} alt="email" />
          <span>warmbliss@gmail.com</span>
        </p>
      </div>

      <div className={styles.links}>
        <a href="#">FAQs</a>
        <a href="#">Jobs</a>
        <a href="#">Press</a>
        <a href="#">Blog</a>
      </div>

      <div className={styles.links}>
        <a href="#">News</a>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Reviews</a>
      </div>

      <div className={styles.social}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
      </div>
    </div>

    <hr className={styles.divider} />

    <div className={styles.bottom}>
      <span>Copyright &copy; 2025 Warm Bliss Hotel</span>
      <a href="#top">Back to top</a>
    </div>
  </footer>
);

export default Footer;
