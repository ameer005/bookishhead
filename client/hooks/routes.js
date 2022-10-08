import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const withPublic = (Component) => {
  return function withPublic(props) {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const user = useStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      setUserLoggedIn(user ? true : false);
    }, []);

    if (isUserLoggedIn) {
      router.replace("/");
      return null;
    }

    return <Component {...props} />;
  };
};

export const withProtected = (Component) => {
  return function withPublic(props) {
    const [isUserLoggedIn, setUserLoggedIn] = useState(true);
    const user = useStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      setUserLoggedIn(user ? true : false);
    }, []);

    if (!isUserLoggedIn) {
      router.replace("/login");
      return null;
    }

    if (user) {
      return <Component {...props} />;
    }
  };
};
