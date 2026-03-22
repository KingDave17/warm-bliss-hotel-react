import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setLoading(true);
    try {
      await updateUserProfile(currentUser, { displayName: displayName.trim() });
      setMsg("Profile updated successfully!");
      setIsEditing(false);
      // Automatically hide message
      setTimeout(() => setMsg(""), 4000);
    } catch (err) {
      console.error(err);
      setMsg("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Profile</h1>
          <p>Manage your account details and personal information.</p>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "G"}
            </div>
            <div className={styles.userInfo}>
              <h2>{currentUser?.displayName || "Guest Guest"}</h2>
              <p className={styles.userEmail}>{currentUser?.email}</p>
            </div>
          </div>

          <div className={styles.divider} />

          {msg && (
            <div className={`${styles.message} ${msg.includes("success") ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <div className={styles.detailsSection}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" value={currentUser?.email || ""} disabled className={styles.disabledInput} />
              <small>Email address cannot be changed.</small>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdate} className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    required 
                    autoFocus
                  />
                </div>
                <div className={styles.actionButtons}>
                  <button type="submit" disabled={loading} className={styles.saveBtn}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.viewMode}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <p className={styles.readOnlyText}>{currentUser?.displayName || "Not set"}</p>
                </div>
                <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
