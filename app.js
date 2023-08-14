const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
