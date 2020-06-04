
// const express = require('express')
// const app = express()

// const PORT = process.env.PORT || 4000

// app.get('/', (req, res) => {
//   res.json({
//     message: 'OK'
//   })
// })

// app.get('*', (req, res) => {
//   res.json({
//     message: 'Error'
//   })
// })

// app.listen(PORT, () => {
//   console.log(`Server is listening on ${PORT}`)
// })

const express = require("express");
const line = require("@line/bot-sdk");
require("dotenv/config");

const app = express();
// const config = require("./config")

const PORT = 4800;

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};

const client = new line.Client(config);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

function handleEvent(event) {
  console.log(event);
  if (event.type === "message" && event.message.type === "text") {
    handleMessageEvent(event);
  } else {
    return Promise.resolve(null);
  }
}

function handleMessageEvent(event) {
  var msg = {
    type: "text",
    text: "สวัสดีนะครับ",
  };

  return client.replyMessage(event.replyToken, msg);
}

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
