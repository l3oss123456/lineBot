const express = require("express");
const line = require("@line/bot-sdk");
require("dotenv/config");
const app = express();

const PORT = process.env.PORT || 4000;

// const client = new line.Client({
//   channelAccessToken: process.env.channelAccessToken
// });

// const config = {
//   channelAccessToken: process.env.channelAccessToken,
//   channelSecret: process.env.channelSecret,
// };

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Nongbot",
  });
});

app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});

function reply(reply_token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.channelAccessToken}`,
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "Hello",
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}
// app.post("/webhook", (req, res) => {
//   // Promise.all(req.body.events.map(handleEvent)).then((result) =>
//   //   res.json(result)
//   // );
//   // res.json({
//   //   message: 'Welcome to Nongbot/webhook'
//   // })
// });

// function handleEvent(event) {
//   if (event.type === "message" && event.message.type === "text") {
//     handleMessageEvent(event);
//   } else {
//     return Promise.resolve(null);
//   }
// }

// function handleMessageEvent(event) {
//   var msg = {
//     type: "text",
//     text: "สวัสดีนะครับ",
//   };

//   return client.replyMessage(event.replyToken, msg);
// }

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// const express = require("express");
// const line = require("@line/bot-sdk");
// require("dotenv/config");

// const app = express();
// // const config = require("./config")

// const PORT = 4800;

// const config = {
//   channelAccessToken: process.env.channelAccessToken,
//   channelSecret: process.env.channelSecret,
// };

// const client = new line.Client(config);

// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to nongBot",
//   });
// });

// app.post("/webhook", line.middleware(config), (req, res) => {
//   Promise.all(req.body.events.map(handleEvent)).then((result) =>
//     res.json(result)
//   );
// });

// function handleEvent(event) {
//   console.log(event);
//   if (event.type === "message" && event.message.type === "text") {
//     handleMessageEvent(event);
//   } else {
//     return Promise.resolve(null);
//   }
// }

// function handleMessageEvent(event) {
//   var msg = {
//     type: "text",
//     text: "สวัสดีนะครับ",
//   };

//   return client.replyMessage(event.replyToken, msg);
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port : ${PORT}`);
// });

// module.exports = app;
