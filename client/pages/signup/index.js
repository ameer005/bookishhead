import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../components/form/InputField";
import BtnPrimary from "../../components/ui/BtnPrimary";
import Logo from "../../components/ui/Logo";
import { schemaSignup } from "../../utils/yup/schema";
import { useSignUp } from "../../hooks/api/auth/useAuth";
import useStore from "../../store/useStore";

const Signup = () => {
  const { mutate, isLoading } = useSignUp();
  const setUserEmail = useStore((state) => state.setUserEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  const submitForm = (formData) => {
    setUserEmail(formData.email);

    mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo />
      <div className="auth">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <h3 className="mb-2 font-bold text-3xl text-colorBlack self-center font-calson">
            Sign Up
          </h3>
          <InputField
            labelText={"Name"}
            name="name"
            type={"text"}
            placeholder={"Your name"}
            register={register}
            errors={errors}
          />
          <InputField
            labelText={"Email"}
            name="email"
            type={"text"}
            placeholder={"Your email"}
            register={register}
            errors={errors}
          />
          <InputField
            labelText={"Password"}
            name="password"
            type={"password"}
            placeholder={"Your password"}
            register={register}
            errors={errors}
          />
          <div>
            <BtnPrimary
              loading={isLoading}
              bgColor={"bg-colorPrimary"}
              textColor={"text-colorWhite"}
              text={"Sign Up"}
              type={"submit"}
            />
          </div>
          <div className="text-sm text-colorSecondary3 font-medium self-center">
            <span>Already have an account? </span>
            <Link href={"/login"}>
              <a className="text-colorPrimary font-bold hover:text-colorBlack ut-animation">
                Login
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
