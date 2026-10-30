require("dotenv").config();

const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.use((req, res) => {
  res.status(404).render("error", { title: "Not Found", statusCode: 404, message: "Page not found." });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", { title: "Error", statusCode: 500, message: "Something went wrong." });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exitCode = 1;
  }
}

startServer();

module.exports = app;
