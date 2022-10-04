import { useState } from "react";

import Profile from "../../components/settings/Profile";
import Account from "../../components/settings/Account";

const ProfilePage = () => {
  const [setting, setSetting] = useState("profile");

  return (
    <section className="px-24">
      <h3 className="font-bold text-lg font-calson mb-4">Account Settings</h3>

      {/* setting selector header */}
      <div className=" flex gap-4 border-b border-colorSecondary2/40 mb-5">
        <button
          onClick={() => setSetting("profile")}
          className={`font-medium pb-2 border-b-2 w-[4rem] ${
            setting === "profile" && "border-colorPrimary"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setSetting("account")}
          className={`font-medium pb-2 border-b-2 w-[4rem] ${
            setting === "account" && "border-colorPrimary"
          }`}
        >
          Account
        </button>
      </div>

      {/* Rendered Settings */}
      {setting === "profile" && <Profile />}
      {setting === "account" && <Account />}
    </section>
  );
};

export default ProfilePage;
