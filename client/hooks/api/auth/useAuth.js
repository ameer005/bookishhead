import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signup,
  activateAccount,
  login,
  FetchMyInfo,
  updateMyInfo,
  changePassword,
  resetPassword,
  forgotPassword,
} from "./authServices";
import useStore from "../../../store/useStore";

export const useSignUp = () => {
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);

  return useMutation(signup, {
    onSuccess: () => router.push("/signup/verify"),
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};

export const useActivateAccount = () => {
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);
  return useMutation(activateAccount, {
    onSuccess: () => router.push("/login"),
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);
  const setUser = useStore((state) => state.setUser);

  return useMutation(login, {
    onError: (error) => {
      if (error.response.status === 403) {
        router.push("/signup/verify");
      }

      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
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
  const setModalState = useStore((state) => state.setModalState);
  return useMutation(updateMyInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");

      setModalState({
        showToastModal: true,
        toastProperties: {
          message: "Profile updated successfully",
          type: "success",
        },
      });
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};

export const useChangePassword = () => {
  const setModalState = useStore((state) => state.setModalState);
  const queryClient = useQueryClient();
  return useMutation(changePassword, {
    onSuccess: () => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: "Password changed successfully",
          type: "success",
        },
      });
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};

export const useForgorPassword = () => {
  const setModalState = useStore((state) => state.setModalState);
  return useMutation(forgotPassword, {
    onSuccess: () => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: "Check your registered email for reset password link",
          type: "success",
        },
      });
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);
  return useMutation(resetPassword, {
    onSuccess: () => router.push("/login"),
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};
