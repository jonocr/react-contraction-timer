import React, { useEffect, useState }  from 'react';
import firebaseApp from "./base.js";
import 'firebase/auth';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // const onChange = (user) => {
  //   setCurrentUser(user);
  // }

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser);
    // const unsubscribe = firebaseApp.auth().onAuthStateChange(onChange);
    return () => {
      firebaseApp.auth().signOut();
    }
  }, []);
 
  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};