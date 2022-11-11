const Discord = require("discord.js");
const { prefix, token } = require("../config.json");
const {
  updateCurrencyBalance,
  getCurrencyBalance,
} = require("./currency-commands");

const fs = require("fs");

//Blackjack
function blackJack(message) {
  message.react("☑️");
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedBetNumber = parseInt(args[1], 10);
  const currency = getCurrencyBalance()[message.author.username];
  let cardValue = Math.ceil(Math.random() * 21);
  if (isNaN(savedBetNumber)) {
    return message.reply("Please enter a number");
  }
  if (savedBetNumber > currency || savedBetNumber < 1) {
    return message.reply("You can't bet that");
  }

  const victoryMoney = savedBetNumber;
  message.reply(
    "Welcome to KingJack!! To get a full page on the rules type `&kj-help`"
  );
  const enemyCardValue = 15 + Math.ceil(Math.random() * 8);
  let bjEmbed = new Discord.MessageEmbed()
    .setTitle("KingJack")
    .setDescription("Type `hit` to hit and `stand` to stand")
    .setAuthor(message.author.username)
    .setColor("#18acd9")
    .setFooter("KingJack")
    .addFields({ name: "Your total card value", value: `${cardValue}.` });
  message.channel.send(bjEmbed);
  message.channel
    .awaitMessages((m) => m.author.id == message.author.id, {
      max: 1,
      time: 30000,
    })
    .then((collected) => {
      if (collected.first().content.toLowerCase() == "hit") {
        let addedCardValue = Math.ceil(Math.random() * 11);
        cardValue += addedCardValue;
        let bjEmbed = new Discord.MessageEmbed()
          .setTitle("KingJack")
          .setAuthor(message.author.username)
          .setDescription("Type `hit` to hit and `stand` to stand")
          .setColor("#18acd9")
          .setFooter("KingJack")
          .addFields({
            name: "Your total card value",
            value: `${cardValue}.`,
            inline: true,
          });

        message.channel.send(bjEmbed);
        if (cardValue > 21) {
          updateCurrencyBalance(message.author.username, -args);
          return message.reply(`Bust! King wins! You lose ${args} Kinogalons`);
        }
        message.channel
          .awaitMessages((m) => m.author.id == message.author.id, {
            max: 1,
            time: 30000,
          })
          .then((collected) => {
            if (collected.first().content.toLowerCase() == "hit") {
              let addedCardValue = Math.ceil(Math.random() * 11);
              cardValue += addedCardValue;
              let bjEmbed = new Discord.MessageEmbed()
                .setTitle("KingJack")
                .setDescription("Type `hit` to hit and `stand` to stand")
                .setAuthor(message.author.username)
                .setColor("#18acd9")
                .setFooter("KingJack")
                .addFields(
                  {
                    name: "Your total card value",
                    value: `${cardValue}.`,
                    inline: true,
                  },
                  {
                    name: "Enemy total card value",
                    value: `${enemyCardValue}`,
                    inline: true,
                  }
                );
              message.channel.send(bjEmbed);
              if (cardValue > 21) {
                updateCurrencyBalance(message.author.username, -savedBetNumber);
                return message.reply(
                  `Bust! King wins! You lose ${savedBetNumber} Kinogalons`
                );
              }
              if (cardValue === 21) {
                updateCurrencyBalance(message.author.username, +args);
                return message.reply(
                  `KingJack!! You win! You get ${victoryMoney} Kinogalons`
                );
              }
              if (cardValue > enemyCardValue || enemyCardValue > 21) {
                updateCurrencyBalance(message.author.username, savedBetNumber);
                return message.reply(
                  `You win!!!! You get ${victoryMoney} Kinogalons`
                );
              }
              if (
                cardValue === enemyCardValue ||
                (cardValue > 21 && enemyCardValue > 21)
              ) {
                message.reply(
                  "Its a tie!! You don't lose, or gain, any Kinogalons."
                );
              }
              if (cardValue < enemyCardValue) {
                updateCurrencyBalance(message.author.username, -savedBetNumber);
                message.reply(
                  `You lose. You lose ${savedBetNumber} Kinogalons `
                );
              }
            } else if (collected.first().content.toLowerCase() == "stand") {
              let bjEmbed = new Discord.MessageEmbed()
                .setTitle("KingJack")
                .setAuthor(message.author.username)
                .setColor("#18acd9")
                .setFooter("KingJack")
                .addFields(
                  {
                    name: "Your total card value",
                    value: `${cardValue}.`,
                    inline: true,
                  },
                  {
                    name: "Enemy total card value",
                    value: `${enemyCardValue}.`,
                    inline: true,
                  }
                );
              message.channel.send(bjEmbed);
              if (cardValue > 21) {
                updateCurrencyBalance(message.author.username, -savedBetNumber);
                return message.reply(
                  `Bust! King wins! You lose ${savedBetNumber} Kinogalons`
                );
              }
              if (cardValue === 21) {
                updateCurrencyBalance(message.author.username, savedBetNumber);
                return message.reply(
                  `KingJack!! You win! You get ${victoryMoney} Kinogalons`
                );
              }
              if (cardValue > enemyCardValue || enemyCardValue > 21) {
                updateCurrencyBalance(message.author.username, savedBetNumber);
                return message.reply(
                  `You win!!!! You get ${victoryMoney} Kinogalons`
                );
              }
              if (
                cardValue === enemyCardValue ||
                (cardValue > 21 && enemyCardValue > 21)
              ) {
                message.reply(
                  "Its a tie!! You don't lose, or gain, any Kinogalons."
                );
              }
              if (cardValue < enemyCardValue) {
                updateCurrencyBalance(message.author.username, -savedBetNumber);
                message.reply(
                  `You lose. You lose ${savedBetNumber} Kinogalons `
                );
              }
            } else {
              message.reply(
                "That was not an option, ending KingJack. (You lose half your coins that you betted)"
              );
            }
          }, 2000);
      } else if (collected.first().content.toLowerCase() == "stand") {
        let bjEmbed = new Discord.MessageEmbed()
          .setTitle("KingJack")
          .setAuthor(message.author.username)
          .setColor("#18acd9")
          .setFooter("KingJack")
          .addFields(
            {
              name: "Your total card value",
              value: `${cardValue}.`,
              inline: true,
            },
            {
              name: "Enemy total card value",
              value: `${enemyCardValue}.`,
              inline: true,
            }
          );
        message.channel.send(bjEmbed);
        if (cardValue > 21) {
          updateCurrencyBalance(message.author.username, -savedBetNumber);
          return message.reply(
            `Bust! King wins! You lose ${savedBetNumber} Kinogalons`
          );
        }
        if (cardValue === 21) {
          updateCurrencyBalance(message.author.username, savedBetNumber);
          return message.reply(
            `KingJack!! You win! You get ${victoryMoney} Kinogalons`
          );
        }
        if (cardValue > enemyCardValue || enemyCardValue > 21) {
          updateCurrencyBalance(message.author.username, savedBetNumber);
          return message.reply(
            `You win!!!! You get ${victoryMoney} Kinogalons`
          );
        }
        if (
          cardValue === enemyCardValue ||
          (cardValue > 21 && enemyCardValue > 21)
        ) {
          message.reply("Its a tie!! You don't lose, or gain, any Kinogalons.");
        }
        if (cardValue < enemyCardValue) {
          updateCurrencyBalance(message.author.username, -savedBetNumber);
          message.reply(`You lose. You lose ${savedBetNumber} Kinogalons `);
        }
      } else {
        message.reply("That was not an option, ending KingJack.");
      }
    }, 2000);
}

module.exports = blackJack;

/*

function someThing() {}
function someOtherThing() {}

module.exports = { someThing, someOtherThing}

// in another file

const {someThing, someOtherThing} = require('./path/to/script')

*/
