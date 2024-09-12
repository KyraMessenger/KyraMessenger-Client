import { createContext, useEffect, useState } from "react";
import { getUser } from "../utils/api";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
