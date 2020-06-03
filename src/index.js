const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {xxxxxxx}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

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
//   res.send("Hello World");
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
