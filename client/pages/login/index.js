import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../components/form/InputField";
import BtnPrimary from "../../components/ui/BtnPrimary";
import Logo from "../../components/ui/Logo";
import { schemaLogin } from "../../utils/yup/schema";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo />
      <div className=" w-full max-w-[30rem] rounded-lg py-5 px-7">
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
              textColor={"text-colorBlack"}
              text={"Login"}
              type={"submit"}
            />
          </div>
          <Link href={"/signup"}>
            <a className="text-sm w-full py-3 px-4 rounded-lg font-bold hover:brightness-90 ut-animation bg-colorSecondary text-colorBlack text-center">
              Create New Account
            </a>
          </Link>
          <button className="text-sm font-semibold text-colorSecondary3 hover:text-colorBlack ut-animation">
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
