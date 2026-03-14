import React, { createContext, useContext, useMemo, useState } from 'react';

type NewCustomerModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const NewCustomerModalContext = createContext<NewCustomerModalContextValue | null>(null);

export function NewCustomerModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return (
    <NewCustomerModalContext.Provider value={value}>{children}</NewCustomerModalContext.Provider>
  );
}

export function useNewCustomerModal() {
  const context = useContext(NewCustomerModalContext);

  if (!context) {
    throw new Error('useNewCustomerModal must be used inside NewCustomerModalProvider');
  }

  return context;
}
