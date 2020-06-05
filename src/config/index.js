require("dotenv/config");

module.exports = {
  port: process.env.PORT || 8000,
  lineConfig: {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret,
  },
};
