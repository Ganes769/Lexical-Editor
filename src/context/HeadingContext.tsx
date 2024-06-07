import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeadingContextType {
  heading: string;
  headingIcon: string;
  alignIcon: string;
  setAlignIcon: (align: string) => void;
  setHeadingIcon: (headingIcon: string) => void;
  setHeading: (heading: string) => void;
}

const HeadingContext = createContext<HeadingContextType | undefined>(undefined);

export const useHeadingContext = () => {
  const context = useContext(HeadingContext);
  if (!context) {
    throw new Error("useHeadingContext must be used within a HeadingProvider");
  }
  return context;
};

interface HeadingProviderProps {
  children: ReactNode;
}

export const HeadingProvider = ({ children }: HeadingProviderProps) => {
  const [heading, setHeading] = useState<string>("normal");
  const [headingIcon, setHeadingIcon] = useState<string>("heading1");
  const [alignIcon, setAlignIcon] = useState("left");
  return (
    <HeadingContext.Provider
      value={{
        heading,
        setHeading,
        headingIcon,
        setHeadingIcon,
        alignIcon,
        setAlignIcon,
      }}
    >
      {children}
    </HeadingContext.Provider>
  );
};
