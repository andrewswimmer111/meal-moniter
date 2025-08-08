import { createContext, useEffect, useState } from "react";
import type { User, UserContextType } from "../types/auth";
import type { ReactNode } from "react";


export const UserContext = createContext<UserContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/token`, {
        credentials: 'include', 
    })
    .then((res) => {
    if (!res.ok) throw new Error('Not authenticated');
        return res.json();
    })
    .then((data) => {
        setUser(data.user);
    })
    .catch(() => {
        setUser(null);
    });
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include', // send cookie to clear it server-side
    });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};