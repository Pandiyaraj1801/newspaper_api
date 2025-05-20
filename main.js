import express from "express";
import toml from "toml";
import fs from "fs";

const app = express();
app.use(express.json());

app.get("/getUserdata", (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const today = new Date();
  today.setDate(today.getDate() - 1);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const previousDate = `${year}-${month}-${day}`;

  fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=${previousDate}&sortBy=publishedAt&apiKey=5b21cfd79046481e91f216d22d686c33`
  )
    .then((res) => res.json())
    .then((val) => {
      res.status(200).json({
        status: "S",
        msg: "Fetched SuccessFully",
        articles: [...val.articles],
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: "E",
        errMsg: err.message,
      });
    });
});

const configFile = fs.readFileSync("./toml/config.toml", "utf-8");
const port = toml.parse(configFile);

app.listen(port, () => {
  console.log("server started.....");
});
