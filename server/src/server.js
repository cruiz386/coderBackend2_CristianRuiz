import express from "express";
import session from 'express-session'
import cookieParser from "cookie-parser";
import { initMongoDB } from "./db/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from 'passport';
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import path from "path";
import 'dotenv/config';
import './passport/jwt.js';
import router from "../src/routes/index.router.js";

const app = express();

const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_LINK,
    crypto: { secret: process.env.SECRET_KEY },
    ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static("public"));
app.use(router);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");


app.use(errorHandler);



initMongoDB().then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});