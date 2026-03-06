import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthContextValue = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      logIn: () => setIsLoggedIn(true),
      logOut: () => setIsLoggedIn(false),
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
