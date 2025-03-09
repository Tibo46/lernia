import React, { createContext, useContext, useState, ReactNode } from "react";

interface PageContextProps {
  title: string;
  showNavigation: boolean;
  setPageTitle: (title: string) => void;
  setShowNavigation: (show: boolean) => void;
}

const defaultContext: PageContextProps = {
  title: "Lernia",
  showNavigation: true,
  setPageTitle: () => {},
  setShowNavigation: () => {},
};

const PageContext = createContext<PageContextProps>(defaultContext);

export const PageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>(defaultContext.title);
  const [showNavigation, setShowNavigation] = useState<boolean>(
    defaultContext.showNavigation
  );

  const setPageTitle = (newTitle: string) => {
    setTitle(newTitle);
    // Update the document title
    document.title = newTitle ? `${newTitle} | Lernia` : "Lernia";
  };

  return (
    <PageContext.Provider
      value={{
        title,
        showNavigation,
        setPageTitle,
        setShowNavigation,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
