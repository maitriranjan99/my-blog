import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`🍀 Server is started at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed:", error);
  });
