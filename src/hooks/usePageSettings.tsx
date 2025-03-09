import { useEffect } from "react";
import { usePage } from "../contexts/PageContext";

interface PageSettingsOptions {
  title?: string;
  showNavigation?: boolean;
}

export const usePageSettings = (options: PageSettingsOptions = {}) => {
  const { setPageTitle, setShowNavigation } = usePage();

  useEffect(() => {
    if (options.title !== undefined) {
      setPageTitle(options.title);
    }

    if (options.showNavigation !== undefined) {
      setShowNavigation(options.showNavigation);
    }

    // Reset to defaults when component unmounts
    return () => {
      setPageTitle("Lernia");
      setShowNavigation(true);
    };
  }, [options.title, options.showNavigation, setPageTitle, setShowNavigation]);
};
