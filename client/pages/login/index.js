import Link from "next/link";
import { withPublic } from "../../hooks/routes";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../components/form/InputField";
import BtnPrimary from "../../components/ui/BtnPrimary";
import Logo from "../../components/ui/Logo";
import { schemaLogin } from "../../utils/yup/schema";
import useStore from "../../store/useStore";
import { useLogin } from "../../hooks/api/auth/useAuth";

const LoginPage = () => {
  const setUserEmail = useStore((state) => state.setUserEmail);
  const { isLoading, mutate } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
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
            Login
          </h3>
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
              bgColor={"bg-colorPrimary"}
              textColor={"text-colorWhite"}
              text={"Login"}
              type={"submit"}
              loading={isLoading}
            />
          </div>

          <div className="font-medium self-center text-center">
            <div className="mb-1">
              <span>Don't have an account?</span>
              <Link href={"/signup"}>
                <a className="text-colorPrimary ml-1 font-bold hover:text-colorPrimaryLight2 ut-animation">
                  Sign Up
                </a>
              </Link>
            </div>
            <Link href={"/resetpassword"}>
              <a className="text-gray-400 text-sm ut-animation hover:text-gray-500">
                Forgot assword?
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withPublic(LoginPage);
