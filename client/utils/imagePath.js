let imagePath = "up";

if (process.env.NODE_ENV !== "production") {
  imagePath = "http://127.0.0.1:5000/user/";
}

export default imagePath;
