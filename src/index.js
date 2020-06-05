// const express = require("express");
// const line = require("@line/bot-sdk");
// const bodyParser = require('body-parser')
// const request = require('request')
// require("dotenv/config");
// const app = express();

// const PORT = process.env.PORT || 4000;
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // const client = new line.Client({
// //   channelAccessToken: process.env.channelAccessToken
// // });

// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to Nongbot",
//   });
// });

// app.post("/webhook", (req, res) => {
//   let reply_token = req.body.events[0].replyToken;
//   reply(reply_token);
//   res.sendStatus(200);
// });

// function reply(reply_token) {
// let headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${process.env.channelAccessToken}`,
// };
// let body = JSON.stringify({
//   replyToken: reply_token,
//   messages: [
//     {
//       type: "text",
//       text: "Hello",
//     },
//     {
//       type: "text",
//       text: "How are you?",
//     },
//   ],
// });
// request.post(
//   {
//     url: "https://api.line.me/v2/bot/message/reply",
//     headers: headers,
//     body: body,
//   },
//   (err, res, body) => {
//     console.log("status = " + res.statusCode);
//   }
// );
// }

// app.listen(PORT, () => {
//   console.log(`Server is listening on ${PORT}`);
// });

// module.exports = app

const express = require("express");
const line = require("@line/bot-sdk");
const axios = require("axios");
const CircularJSON = require("circular-json");
require("dotenv/config");

const app = express();
// const config = require("./config")

const PORT = process.env.PORT || 4000;

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};

const client = new line.Client({
  channelAccessToken: process.env.channelAccessToken,
});

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to nongBot",
  });
  // const resp = await axios.get(
  //   `http://data.fixer.io/api/latest?access_key=${process.env.fixerApiKey}`
  // );
  // const json = CircularJSON.stringify(resp);
  // res.send(JSON.parse(json));
  // const cal =
  //   (100 / JSON.parse(json).data.rates.USD) *
  //   parseFloat(JSON.parse(json).data.rates.THB);
  // console.log("cal: ", cal);
});

app.post("/webhook", line.middleware(config), async (req, res) => {
  // await req.body.events.map((event) => {
  //   if (event.type === "message" && event.message.type === "text") {
  //     handleMessageEvent(event);
  //   }
  // });
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
      parseFloat(JSON.parse(json).data.rates.THB)) *
    parseFloat(JSON.parse(json).data.rates.THB);
  // var msg = {
  //   type: "text",
  //   text: event.message.text,
  // };
  var msg = {
    type: "text",
    text: cal.toFixed(2),
  };

  return client.replyMessage(event.replyToken, msg);
};

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
