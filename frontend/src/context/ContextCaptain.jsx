import React, { createContext, useEffect, useState } from "react";

export const CaptainDataContext = createContext();

const ContextCaptain = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  useEffect(() => {
    const savedCaptain = localStorage.getItem("captain");
    if (savedCaptain) setCaptain(JSON.parse(savedCaptain));
  }, []);

  useEffect(() => {
    if (captain) {
      localStorage.setItem("captain", JSON.stringify(captain));
    } else {
      localStorage.removeItem("captain");
    }
  }, [captain]);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default ContextCaptain;
