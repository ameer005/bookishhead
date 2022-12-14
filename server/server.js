// Module imports
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const hemlet = require("helmet");
const errorHandlerMiddleware = require("./middleware/error/errorHandler");
const connectDb = require("./db/connect");

// Routes imports
const userRouter = require("./routes/user/userRoutes");
const bookRouter = require("./routes/book/bookRoutes");
const reviewRouter = require("./routes/review/reviewRoutes");

dotenv.config();
const app = express();

// Global middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(hemlet());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "yo this is working",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/reviews", reviewRouter);

// Global Error handeling
app.use(errorHandlerMiddleware);

// Staring server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
