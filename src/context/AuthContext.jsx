import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { signUpUser, signInUser, signOutUser } from "../firebase/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = (email, password, name) => signUpUser(email, password, name);
  const login = (email, password) => signInUser(email, password);
  const logout = () => signOutUser();

  return (
    <AuthContext.Provider value={{ currentUser, loading, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
