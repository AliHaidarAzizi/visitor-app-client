import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue, venueId) => {
  const venueKey = `${key}-${venueId}`; // Append venueId to the key

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(venueKey);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(venueKey, JSON.stringify(value));
  }, [venueKey, value]); // Update dependency array

  return [value, setValue];
};

export default useLocalStorage;
