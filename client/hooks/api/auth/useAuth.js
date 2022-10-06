import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signup,
  activateAccount,
  login,
  FetchMyInfo,
  updateMyInfo,
  changePassword,
} from "./authServices";
import useStore from "../../../store/useStore";

export const useSignUp = () => {
  const router = useRouter();
  return useMutation(signup, {
    onSuccess: () => router.push("/signup/verify"),
  });
};

export const useActivateAccount = () => {
  const router = useRouter();
  return useMutation(activateAccount, {
    onSuccess: () => router.push("/login"),
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  return useMutation(login, {
    onError: (err) => {
      console.log(err.response.status);
      if (err.response.status === 403) {
        router.push("/signup/verify");
      }
    },
    onSuccess: (data) => {
      const response = data.data;
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      router.push("/");
    },
  });
};

export const useFetchMyInfo = () => {
  return useQuery(["users"], FetchMyInfo);
};

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMyInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation(changePassword);
};
