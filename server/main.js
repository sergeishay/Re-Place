const express = require("express");
const cors = require("cors");

require("./configs/DB");

const booksRouter = require("./routers/booksRouter");

const port = 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
