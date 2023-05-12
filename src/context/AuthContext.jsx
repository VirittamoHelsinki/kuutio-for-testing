import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);

  const createUser = async (email, password, group) => {
    try {
      const userdata = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userdata.user.uid), {
        email: email,
        group: group,
      });
      signOut(auth);
      await sendEmailVerification(userdata.user);
      window.alert("Vahvistuspyyntö lähetetty antamaasi sähköpostiosoitteeseen");
      await setDoc(
        doc(db, "logs", new Date().toJSON().slice(0, 10)),
        {
          [new Date().toLocaleTimeString("en-GB")]: userdata.user.uid + " created user",
        },
        { merge: true }
      );
    } catch (error) {
      window.alert("Käyttäjätilin luominen ei onnistunut:\n\n" + error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userdata = await signInWithEmailAndPassword(auth, email, password);
      if (!userdata.user.emailVerified) {
        signOut(auth);
        window.alert("Ole hyvä ja käy vahvistamassa rekisteröityminen antamassasi sähköpostiosoitteessa");
      }
      await setDoc(
        doc(db, "logs", new Date().toJSON().slice(0, 10)),
        {
          [new Date().toLocaleTimeString("en-GB")]: userdata.user.uid + " signed in",
        },
        { merge: true }
      );
    } catch (error) {
      window.alert("Kirjautuminen ei onnistunut antamallasi sähköpostilla ja salasanalla:\n\n" + error);
    }
  };

  const logout = async () => {
    if (user) {
      await setDoc(
        doc(db, "logs", new Date().toJSON().slice(0, 10)),
        {
          [new Date().toLocaleTimeString("en-GB")]: user.uid + " signed out",
        },
        { merge: true }
      );
    }
    setAdmin(false);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email.includes("@hel.fi")) {
        setAdmin(true);
      }
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ createUser, user, admin, logout, signIn }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
