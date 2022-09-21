import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { signup, activateAccount } from "./authServices";

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
