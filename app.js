const express = require("express");
const cors = require("cors");

const authRouter = require("./src/routes/auth.route");
const userRouter = require("./src/routes/user.route");
const clientRouter = require("./src/routes/client.route");
const caseRouter = require("./src/routes/case.route");
const timeentryRouter = require("./src/routes/timeentry.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/clients", clientRouter);
app.use("/cases", caseRouter);
app.use("/timeentries", timeentryRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
