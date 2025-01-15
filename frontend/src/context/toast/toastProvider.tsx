"use client";

import { Alert } from "@nextui-org/react";
import { createContext, useContext, useState } from "react";
import { ToastContextValue } from "./toastProvider.types";

export const ToastContext = createContext<ToastContextValue>(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("You can only call this hook inside ToastProvider.");
  }
  return context;
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<null | { title: string; color: string }>(
    null
  );

  const toast = (toastOption: { title: string; color: string }) => {
    setValue(toastOption);
    setIsVisible(true);
    setTimeout(() => {
      setValue(null);
      setIsVisible(false);
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={`${
          isVisible ? "opacity-100" : "opacity-0"
        } transition absolute bg-background top-2 right-2 rounded-full`}
      >
        <Alert
          isVisible={isVisible}
          title={value?.title}
          variant="flat"
          radius="full"
          size="sm"
          color={value?.color}
        />
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
