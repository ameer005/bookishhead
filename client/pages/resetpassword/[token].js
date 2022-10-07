import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPassword } from "../../hooks/api/auth/useAuth";

import InputField from "../../components/form/InputField";
import BtnPrimary from "../../components/ui/BtnPrimary";
import Logo from "../../components/ui/Logo";
import { schemaResetPassword } from "../../utils/yup/schema";

const resetPasswordPage = () => {
  const { mutate, isLoading } = useResetPassword();
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaResetPassword),
  });

  const submitForm = (formData) => {
    console.log(formData);

    mutate({
      token,
      data: { ...formData },
    });
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
            Reset Password
          </h3>
          <InputField
            labelText={"New Password"}
            name="newPassword"
            type={"text"}
            placeholder={"enter new password"}
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
      </div>
    </div>
  );
};

export default resetPasswordPage;
