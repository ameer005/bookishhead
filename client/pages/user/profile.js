import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchMyInfo } from "../../hooks/api/auth/useAuth";

import defaultAvatar from "../../public/images/default2.png";

import Heading from "../../components/ui/Heading";
import InputField from "../../components/form/InputField";
import { updateProfile, changePassword } from "../../utils/yup/schema";

const ProfilePage = () => {
  const {
    data: userInfo,
    isSuccess: userInfoSuccess,
    isLoading: userInfoLoading,
  } = useFetchMyInfo();

  const {
    register: updateProfileRegister,
    formState: { errors: updateProfileErrors },
    handleSubmit: updateProfileSubmit,
    setValue: setProfileValue,
  } = useForm({
    resolver: yupResolver(updateProfile),
  });

  const {
    register: changePasswordRegister,
    formState: { errors: changePasswordErrors },
    handleSubmit: changePasswordSubmit,
  } = useForm({
    resolver: yupResolver(changePassword),
  });

  useEffect(() => {
    if (userInfoSuccess) {
      setProfileValue("name", userInfo.data.user.name);
    }
  }, [userInfoSuccess]);

  const submitProfileFrom = (formData) => {
    console.log(formData);
  };

  const submitPasswordForm = (formData) => {
    console.log(formData);
  };

  return (
    <section className="max-w-[22rem]">
      <form onSubmit={updateProfileSubmit(submitProfileFrom)} className="mb-8">
        <Heading>Your Profile Settings</Heading>
        <div className="flex gap-3 items-center mb-4 pt-2">
          <div className="h-[4rem] w-[4rem] rounded-full bg-red-500">
            <Image src={defaultAvatar}></Image>
          </div>
          <div className="font-bold text-xs text-colorPrimaryLight2">
            Choose Photo
          </div>
        </div>
        <InputField
          name={"name"}
          errors={updateProfileErrors}
          labelText={"Name"}
          placeholder={"change name"}
          register={updateProfileRegister}
          type={"text"}
        />
      </form>
      <form className="">
        <Heading>change password</Heading>
        <div className="mb-3 pt-2">
          <InputField
            name={"currentPassword"}
            errors={changePasswordErrors}
            labelText={"Current Password"}
            placeholder={"Current password"}
            register={changePasswordRegister}
            type={"text"}
          />
        </div>
        <div className="mb-3">
          <InputField
            name={"newPassword"}
            errors={changePasswordErrors}
            labelText={"New Password"}
            placeholder={"new password"}
            register={changePasswordRegister}
            type={"text"}
          />
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
