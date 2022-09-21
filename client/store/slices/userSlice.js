let user;
if (typeof window !== "undefined")
  user = JSON.parse(localStorage.getItem("user"));

const userSlice = (set, get) => ({
  user: user || null,
  email: "",
  setUser: (user) => {
    set({ user: user });
  },
  setUserEmail: (email) => {
    set({ email: email });
  },
  removeUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});

export default userSlice;
