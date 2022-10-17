import { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { withProtected } from "../../hooks/routes";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFetchMyInfo,
  useUpdateMyInfo,
  useChangePassword,
} from "../../hooks/api/auth/useAuth";

import defaultAvatar from "../../public/images/default2.png";

import Heading from "../../components/ui/Heading";
import InputField from "../../components/form/InputField";
import { updateProfile, changePassword } from "../../utils/yup/schema";
import imagePath from "../../utils/imagePath";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProfilePage = () => {
  const {
    data: userInfo,
    isSuccess: userInfoSuccess,
    isLoading: userInfoLoading,
  } = useFetchMyInfo();
  const userData = userInfo?.data.user;

  const {
    mutate: updateUserInfo,
    isSuccess: updateUserInfoSuccess,
    isLoading: updateUserInfoLoading,
  } = useUpdateMyInfo();

  const {
    mutate: changePassowrd,
    isSuccess: changePassowrdSuccess,
    isLoading: changePassowrdLoading,
  } = useChangePassword();

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
      setProfileValue("name", userData.name);
    }
  }, [userInfoSuccess]);

  const submitProfileFrom = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("userImage", data.userImage[0]);
    console.log(data.userImage[0]);

    updateUserInfo(formData);
  };

  const submitPasswordForm = (formData) => {
    changePassowrd(formData);
  };

  return (
    <div className="max-w-[22rem]">
      <form onSubmit={updateProfileSubmit(submitProfileFrom)} className="mb-8">
        <Heading>Your Profile Settings</Heading>
        <div className="flex gap-3 items-center mb-4 pt-2">
          <div className="relative h-[4rem] w-[4rem] overflow-hidden rounded-full">
            <Image
              className=""
              layout="fill"
              objectFit="contain"
              src={
                userData?.userImage
                  ? `${imagePath}${userData.userImage}`
                  : defaultAvatar
              }
            ></Image>
          </div>

          <label>
            <div className="font-bold text-xs text-colorPrimaryLight2 cursor-pointer">
              Update Photo
            </div>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              name="userImage"
              {...updateProfileRegister("userImage")}
            />
          </label>
        </div>
        <div className="mb-3">
          <InputField
            name={"name"}
            errors={updateProfileErrors}
            labelText={"Name"}
            placeholder={"change name"}
            register={updateProfileRegister}
            type={"text"}
          />
        </div>

        <button
          type="submit"
          className="bg-colorPrimary text-colorWhite w-[8rem] py-2 rounded-md hover:bg-colorPrimaryLight2 ut-animation"
        >
          {updateUserInfoLoading ? <LoadingSpinner /> : "Save Settings"}
        </button>
      </form>
      <form onSubmit={changePasswordSubmit(submitPasswordForm)}>
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
        <button
          type="submit"
          className="bg-colorPrimary text-colorWhite w-[8rem] py-2 rounded-md hover:bg-colorPrimaryLight2 ut-animation"
        >
          {changePassowrdLoading ? <LoadingSpinner /> : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default withProtected(ProfilePage);
