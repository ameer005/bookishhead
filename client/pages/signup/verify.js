import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../components/form/InputField";
import BtnPrimary from "../../components/ui/BtnPrimary";
import Logo from "../../components/ui/Logo";
import { schemaActivateAccount } from "../../utils/yup/schema";
import { useActivateAccount } from "../../hooks/api/auth/useAuth";
import useStore from "../../store/useStore";

const Verify = () => {
  const { mutate, isLoading } = useActivateAccount();
  const userEmail = useStore((state) => state.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaActivateAccount),
  });

  const submitForm = (formData) => {
    console.log(formData);

    const payload = {
      otp: formData.otp,
      email: userEmail,
    };
    mutate(payload);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo />
      <div className="auth">
        <form
          className="flex flex-col gap-4 mb-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <h3 className="mb-2 font-bold text-2xl text-colorBlack self-center font-calson">
            OTP Verification
          </h3>
          <InputField
            labelText={"OTP"}
            name="otp"
            type={"text"}
            placeholder={"Enter Otp"}
            register={register}
            errors={errors}
          />

          <BtnPrimary
            loading={isLoading}
            bgColor={"bg-colorPrimary"}
            textColor={"text-colorWhite"}
            text={"Submit"}
            type={"submit"}
          />
        </form>
        <div className="text-sm text-colorSecondary3 font-medium self-center">
          <span>Didn't recieved OTP?</span>

          <button className="text-colorPrimary font-bold hover:text-colorBlack ut-animation">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
