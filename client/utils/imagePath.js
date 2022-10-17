let imagePath = "https://bookishhead.vercel.app/";

if (process.env.NODE_ENV !== "production") {
  imagePath = "http://127.0.0.1:5000/user/";
}

export default imagePath;
