import app from "./src/app.js";
import dotenv from "dotenv/config"
import db from "./src/common/config/db/db.js";
 
 
const PORT = process.env.PORT || 8080;
const server = async () => {
  app.listen(PORT, () => {
    console.log(
      `server is running at ${process.env.PORT} port in ${process.env.NODE_MODE} mode.`,
    );
  });
};

server()
 