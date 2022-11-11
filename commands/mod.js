const Discord = require("discord.js");

let { prefix, token } = require("../config.json");

//Basic admin test
function adminTest(message) {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    message.reply("BOIIII UR AN ADMIN");
  } else {
    message.reply("LOL YOU LITTLE NOOB!! UR NOT AN ADMIN");
  }
}

function warn(message) {
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    message.channel.send("You have no permissions to do that");
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(",");
  const reason = args[1];
  const warnedUser = message.mentions.users.first();
  if (!message.mentions.users.size) {
    return message.reply("You can't warn no one");
  }
  const msg = message.channel.send(
    `${warnedUser}, you have been warned by ${message.author}. Reason: ${
      reason ?? "not specified"
    }`
  );
  message.delete(msg);
}

module.exports = { warn };
