const express = require("express");

const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares/");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/learning");

// middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started at port 8000`));
