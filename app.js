import express from "express";

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
