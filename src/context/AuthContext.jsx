import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, getAuth } from "firebase/auth";
import { auth } from "../firebase/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    try {
      const userdata = await createUserWithEmailAndPassword(auth, email, password);
      signOut(auth);
      await sendEmailVerification(userdata.user);
      window.alert("Vahvistuspyyntö lähetetty antamaasi sähköpostiosoitteeseen");
    } catch (error) {
      window.alert(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userdata = await signInWithEmailAndPassword(auth, email, password);
      if (!userdata.user.emailVerified) {
        signOut(auth);
        window.alert("Ole hyvä ja käy vahvistamassa rekisteröityminen antamassasi sähköpostiosoitteessa");
      }
    } catch (error) {
      window.alert("Kirjautuminen ei onnistunut antamallasi sähköpostilla ja salasanalla: ", error);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ createUser, user, logout, signIn }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
