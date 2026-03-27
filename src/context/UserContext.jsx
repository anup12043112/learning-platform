// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

// Custom hook taki baaki files me easily use kar sakein
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initial user state (0 XP, Level 1)
  const [user, setUser] = useState({
    name: "Learner",
    xp: 0,
    level: 1
  });

  // XP add karne aur level calculate karne ka function
  const addXP = (amount) => {
    setUser((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1; // Har 100 XP pe 1 Level
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  return (
    <UserContext.Provider value={{ user, addXP }}>
      {children}
    </UserContext.Provider>
  );
};