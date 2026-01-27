import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const ContextCaptain = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    },
    vehicle: {
      color: '',
      plate: '',
      capacity: 0,
      vehicleType: ''
    },
    isAvailable: false
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default ContextCaptain;
