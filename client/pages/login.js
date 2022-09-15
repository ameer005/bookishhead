import { useForm } from "react-hook-form";
import InputField from "../components/form/inputField";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-colorWhite w-full max-w-[30rem] rounded-md py-4 px-6">
        <form>
          <h3 className="mb-6 font-bold text-3xl text-colorSecondary">Login</h3>
          <InputField
            errors={errors}
            labelText={"Email"}
            name={"email"}
            placeHolder="Enter email"
            register={register}
            type={"email"}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
