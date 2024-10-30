import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import Login from "./Login";

const Authentication: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, userIsLoading] = useAuthState(auth);

  if (userIsLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Login />;
  }

  return <div>{children}</div>;
};

export default Authentication;
