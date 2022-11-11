const Discord = require("discord.js");

//Help command. 4 lines of commands 3 commands on each line
function help(message) {
  const helpEmbed = new Discord.MessageEmbed()
    .setAuthor("Kings Assistant")
    .setTitle("Help commands")
    .setDescription(
      "__Commands__\n hack, random-number, help,\n challenge, coin-flip, random-count,\n ping, d20,\n d6, 8ball, slap\n*Use help2 for second page*"
    )
    .setColor("#2ed159")
    .setFooter(`Command Prefix is "kng"`);
  message.channel.send(helpEmbed);
  message.react("☑️");
}
//page 2 of help
function helpPage2(message) {
  const helpEmbed2 = new Discord.MessageEmbed()
    .setAuthor("Kings Assistant")
    .setTitle("Help commands page 2")
    .setDescription(
      "__Commands__\nfree-slots, website-link, profile\nwork, slots, currency-help.\nrisk, beg, give,\nembed, kj, fish\n*Use help3 for third page*"
    )
    .setColor("#2ed159")
    .setFooter(`Command Prefix is "kng"`);
  message.channel.send(helpEmbed2);
  message.react("☑️");
}
//page 3 of help
function helpPage3(message) {
  const helpEmbed3 = new Discord.MessageEmbed()
    .setAuthor("Kings Assistant")
    .setTitle("Help commands page 3")
    .setDescription(
      "__Commands__\nhighlow, joke, mod-help,\nwhy, roast (wip) *More commands coming soon!*"
    )
    .setColor("#2ed159")
    .setFooter(`Command Prefix is "kng"`);
  message.channel.send(helpEmbed3);
  message.react("☑️");
}
//Hidden help page
function hiddenDlskahfo(message) {
  message.channel.send(`Hmm. You know the way.`);
  const hiddenCommands = new Discord.MessageEmbed()
    .setAuthor("The humans of dlskahfo tribe")
    .addFields({
      name: "Commands of the dlskahfo",
      value:
        "add-money, triple-slots, theory-test,\nreact-test, shiba-bomb, sus,\n",
    })
    .setColor("#ff0000")
    .setFooter("See you soon dlskahfo friend");
  message.channel.send(hiddenCommands);
  message.react("☑️");
}
//Help wth KingJack
function kjHelp(message) {
  message.channel.send(
    "KingJack is a game very similar to blackjack. The only differences being: aces don't switch between 1 and 11, and you only get 2 chance to hit or stand."
  );
}
//sends an embed with currency commands
function currencyHelp(message) {
  const currencyEmbed = new Discord.MessageEmbed()
    .setColor("#ffde08")
    .setAuthor(`${message.author.username}`)
    .addFields({
      name: "Currency Commands",
      value: "__Commands are__\nwork, slots, profile,\nrisk, beg, give,\nkj",
    })
    .setTimestamp();
  message.channel.send(currencyEmbed);
}

function modHelp(message) {
  const modEmbed1 = new Discord.MessageEmbed()
    .setAuthor("Kings Assistant")
    .setTitle("Help commands (moderation)")
    .setDescription(
      "__Moderation Commands__\nwarn\n*More moderation commands coming soon!*"
    )
    .addFields({
      name: "Warn Command Syntax",
      value:
        "kng warn, [reason], [@user]\nREMEMBER THE COMMAS\nIf you don't want to specify a reason, don't do commas anywhere",
    })
    .setColor("#2ed159")
    .setFooter(`Command Prefix is "kng"`);
  message.channel.send(modEmbed1);
}
module.exports = {
  help,
  helpPage2,
  helpPage3,
  hiddenDlskahfo,
  kjHelp,
  currencyHelp,
  modHelp,
};
