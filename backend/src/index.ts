import express from "express";
import { Router } from "express";
import home from "./routes/home";
import userAuth from "./routes/userAuth";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
declare module "express-session" {
  interface SessionData {
    username: string;
    email: string;
    userId: number;
  }
}

const app = express();
const router = Router();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("/home/removeItem", cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use("/home", home);
app.use("/userauth", userAuth);

app.listen(2100, () => {
  console.log("Listening at 2100");
});
