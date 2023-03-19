import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})