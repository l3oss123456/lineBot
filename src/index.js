const express = require("express");
const line = require("@line/bot-sdk");
const axios = require("axios");
const CircularJSON = require("circular-json");
require("dotenv/config");

const app = express();
const config = require("./config");

const PORT = config.port;

const client = new line.Client({
  channelAccessToken: process.env.channelAccessToken,
});

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to nongBot",
  });
});

app.post("/webhook", line.middleware(config.lineConfig), (req, res) => {
  Promise.all(
    req.body.events.map((event) => {
      if (event.type === "message" && event.message.type === "text") {
        handleMessageEvent(event);
      } else {
        return Promise.resolve(null);
      }
    })
  ).then((result) => res.json(result));
});

const handleMessageEvent = async (event) => {
  const resp = await axios.get(
    `http://data.fixer.io/api/latest?access_key=${process.env.fixerApiKey}`
  );
  const json = CircularJSON.stringify(resp);
  const cal =
    (parseFloat(event.message.text) /
      parseFloat(JSON.parse(json).data.rates.USD)) *
    parseFloat(JSON.parse(json).data.rates.THB);
  var txt;
  if (isNaN(cal)) {
    txt = "กรุณาใส่ข้อมูลที่เป็นตัวเลข !";
  } else {
    txt = cal.toFixed(2) + " บาท";
  }
  var msg = {
    type: "text",
    text: txt,
  };

  return client.replyMessage(event.replyToken, msg);
};

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
