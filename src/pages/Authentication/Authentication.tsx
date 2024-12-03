import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import Login from "./Login";
import FullPageLoading from "../../components/Loading/FullPageLoading";
import { makePutRequest } from "../../services/httpHelper";

const Authentication: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, userIsLoading] = useAuthState(auth);

  React.useEffect(() => {
    const updateUserActivity = async () => {
      if (!user) {
        return;
      }
      await makePutRequest({
        requestUrl: `${import.meta.env.VITE_API_URL}/users/${
          user.uid
        }/activity`,
      });
    };
    if (user) {
      updateUserActivity();
    }
  }, [user]);

  if (userIsLoading) {
    return <FullPageLoading />;
  }
  if (!user) {
    return <Login />;
  }

  return <>{children}</>;
};

export default Authentication;
