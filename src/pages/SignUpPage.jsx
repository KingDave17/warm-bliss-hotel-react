import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./AuthPage.module.css";
import signupBg from "../assets/signup-bg.jpg";

const SignUpPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email is required.";
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError("");
    setLoading(true);
    try {
      await signup(form.email, form.password, form.name);
      setSuccess(true);
      setTimeout(() => navigate("/signin"), 2200);
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        setApiError("This email is already registered. Please sign in.");
      else setApiError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const change = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: "" }));
  };

  return (
    <div className={styles.page}>
      <div
        className={styles.imageSide}
        style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className={styles.imageOverlay}>
          <h1>Warm Bliss Hotel</h1>
          <p>Your luxury escape awaits.</p>
        </div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.formBox}>
          <h2>Create Account</h2>
          <p className={styles.subtitle}>
            Join us for an unforgettable stay.
          </p>

          {success && (
            <div className={styles.successBanner}>
              ✅ Account created! Redirecting to sign in…
            </div>
          )}

          {apiError && <p className={styles.apiError}>{apiError}</p>}

          <form onSubmit={handleSubmit} noValidate>
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
              {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
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
              {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={change("password")}
                className={errors.password ? styles.invalid : ""}
              />
              {errors.password && (
                <p className={styles.fieldError}>{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account?{" "}
            <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
