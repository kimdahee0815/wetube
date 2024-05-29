import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "Hello!",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
    })
);
// app.use((req, res, next) => {
//     req.sessionStore.all((error, sessions) => {
//         console.log(sessions);
//         next();
//     });
//     // console.log(req.headers);
//     // next();
// });

app.use(localsMiddleware);
// app.get("/add-one", (req, res, next) => {
//     req.session.potato += 1;
//     return res.send(`${req.session.id}\n${req.session.potato}`);
// });

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
