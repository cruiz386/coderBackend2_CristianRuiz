import "dotenv/config.js"; 
import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import dbConnect from "./config/db.connection.js";
import { Server } from "socket.io";
import { createServer } from "http";
 

const app = express();
 
const PORT = process.env.PORT || 8080;

// Llamada a dbConnect para iniciar la conexión a MongoDB

dbConnect()
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.log("Error al conectar a MongoDB:", error));

  
// Configuración del servidor
const httpServer = createServer(app);
httpServer.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use(errorHandler); 


  