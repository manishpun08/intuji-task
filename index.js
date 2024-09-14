import express from "express";
import connectDb from "./connect.db.js";
import blogRoute from "./blog/blog.routes.js";

const app = express();

// to make app understand json
app.use(express.json());

// connect db
connectDb();

// register routes
app.use(blogRoute);

// port and server
const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
