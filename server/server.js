// Module imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const errorHandlerMiddleware = require("./middleware/error/errorHandler");
const connectDb = require("./db/connect");

// Routes imports

dotenv.config();
const app = express();

// Global middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "yo this is working",
  });
});

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
