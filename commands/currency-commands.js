const Discord = require("discord.js");
const { prefix, token } = require("../config.json");
const fs = require("fs");

let begCooldown = {};
let workCooldown = {};
let currencyBalance = {};

fs.readFile(`${__dirname}/../currency-balance.json`, (err, data) => {
  if (err) {
    console.error(`Error reading currency balance file: ${err.message}`);
    return;
  }
  try {
    currencyBalance = JSON.parse(data.toString());
  } catch (e) {
    console.error(`Error parsing currency balance file to json ${e.message}`);
  }
});

function updateCurrencyBalance(username, delta) {
  currencyBalance[username] = (currencyBalance[username] ?? 0) + delta;
  fs.writeFile(
    `${__dirname}/../currency-balance.json`,
    JSON.stringify(currencyBalance),
    (err) => {
      if (err)
        console.error(`Error writing currency balance file ${e.message}`);
    }
  );
}

function getCurrencyBalance() {
  return currencyBalance;
}

const cooldowns = new Discord.Collection();

//Betting on slots
function betSlots(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedBetNumber = parseInt(args[1], 10);
  let jackpotEarnings = args * 2;
  if (
    savedBetNumber > currencyBalance[message.author.username] ||
    savedBetNumber < 1
  ) {
    message.channel.send("You can't bet that.");
  } else if (isNaN(savedBetNumber)) {
    message.channel.send(
      "Please retype the command but this time actually put in what you want to bet"
    );
  } else if (!isNaN(savedBetNumber)) {
    let emojiSlots = [
      ":grin:",
      ":tooth:",
      ":face_with_raised_eyebrow:",
      ":poop:",
      ":rage:",
      ":alien:",
    ];
    let a = emojiSlots[Math.floor(Math.random() * emojiSlots.length)];
    let b = emojiSlots[Math.floor(Math.random() * emojiSlots.length)];
    let c = emojiSlots[Math.floor(Math.random() * emojiSlots.length)];
    const emojiEmbed = new Discord.MessageEmbed()
      .setTitle("Slots")
      .setColor("#d1e334")
      .addFields(
        { name: "Slot 1", value: `${a}`, inline: true },
        { name: "Slot 2", value: `${b}`, inline: true },
        { name: "Slot 3", value: `${c}`, inline: true }
      )
      .setTimestamp()
      .setAuthor(`${message.author.username}`);
    message.channel.send(emojiEmbed);

    if (a === b && b === c) {
      updateCurrencyBalance(message.author.username, jackpotEarnings);
      return message.channel.send(
        `Jackpot!! You get ${jackpotEarnings} Kinogalons`
      );
    }

    if (a === b || a === c || c === b) {
      message.channel.send(`You win ${savedBetNumber} Kinogalons`);
      updateCurrencyBalance(message.author.username, savedBetNumber);
    } else {
      message.channel.send(`You lose ${savedBetNumber} Kinogalons`);
      updateCurrencyBalance(message.author.username, -savedBetNumber);
    }
  }
  message.react("☑️");
}
//Hidden function for adding money to people's balance
function hackCurrency(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedNumber = parseInt(args[1], 10);
  const taggedUser = message.mentions.users.first();
  if (isNaN(savedNumber) || !message.mentions.users.size) {
    message.channel.send(
      "Thats not how it works. Command example: `&add-money 200 @Kings Assistant`"
    );
  } else {
    message.channel.send(
      `Cool I will give ${savedNumber} Kinogalons to ${taggedUser}`
    );
    updateCurrencyBalance(taggedUser.username, savedNumber);
    console.log(
      `${message.author.username} gave ${savedNumber} Kinogalons someone.`
    );
  }
  message.react("☑️");
}
//Big risk fur big money
function risk(message) {
  let riskPicker = Math.random();
  let riskAward = Math.ceil(Math.random() * 1200);
  if (currencyBalance[message.author.username] > 79) {
    if (riskPicker > 0.55) {
      message.channel.send(
        `Wow you're popular now and magic wizard comes and gives you ${riskAward} Kinogalons`
      );
      updateCurrencyBalance(message.author.username, riskAward);
    } else {
      message.channel.send(`Ouch you died. You lose all ur coins.`);
      updateCurrencyBalance(
        message.author.username,
        -currencyBalance[message.author.username]
      );
    }
  } else {
    message.channel.send(
      "You're too poor. You need at least 80 Kinogalons to do a risk."
    );
  }
}
//Work command for earning money
function work(message) {
  const userWorkCooldown = workCooldown[message.author.username];
  const now = Date.now();
  if (userWorkCooldown && now < userWorkCooldown) {
    return message.channel.send(
      `You are on cooldown for ${((userWorkCooldown - now) / 1000 / 60).toFixed(
        1
      )} more minutes.`
    );
  }
  let moneyEarned = Math.ceil(Math.random() * 300);
  const workEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`)
    .addFields({ name: "Work earnings", value: `${moneyEarned} Kinogalons` })
    .setColor("#25bbd9");
  message.channel.send(workEmbed);
  updateCurrencyBalance(message.author.username, moneyEarned);
  message.react("☑️");
  workCooldown[message.author.username] = Date.now() + 30 * 60 * 1000;
}
//Profile
function profile(message) {
  let userProfiled = message.mentions.users.first();
  if (!message.mentions.users.size) {
    const profileEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`)
      .addFields({
        name: "Kinogalons Balance",
        value: `${currencyBalance[message.author.username] ?? 0}`,
      })
      .setColor("#25bbd9");
    message.channel.send(profileEmbed);
  } else {
    const otherPlayerEmbed = new Discord.MessageEmbed()
      .setAuthor(userProfiled.username)
      .addFields({
        name: "Kinogalons Balance",
        value: `${currencyBalance[userProfiled.username] ?? 0}`,
      })
      .setColor("#25bbd9");
    message.channel.send(otherPlayerEmbed);
  }
  message.react("☑️");
}
//Little beg command
function beg(message) {
  const userBegCooldown = begCooldown[message.author.username];
  let begAmmount = Math.ceil(Math.random() * 120);
  const now = Date.now();
  if (userBegCooldown && now < userBegCooldown) {
    return message.reply(
      `You are on cooldown for ${((userBegCooldown - now) / 1000).toFixed(
        1
      )} more seconds`
    );
  }
  message.reply(`You got ${begAmmount} Kinogalons while begging. Lucky you...`);
  begCooldown[message.author.username] = Date.now() + 30 * 1000;
  updateCurrencyBalance(message.author.username, begAmmount);

  message.react("☑️");
}
function fish(message) {
  let catchYesNo = Math.random();
  message.reply(
    "Buying bait costs 50 Kinogalons, but if you catch a fish than you get 100 Kinogalons"
  );
  if (currencyBalance[message.author.username] < 50) {
    message.channel.bulkDelete(1);
    return message.channel.send("You need 50 Kinogalons to buy bait.");
  }
  if (catchYesNo > 0.45) {
    message.reply("You caught a fish!");
    updateCurrencyBalance(message.author.username, 50);
  } else {
    message.reply("I guess today is not your lucky day. :smirk:");
    updateCurrencyBalance(message.author.username, -50);
  }
  message.react("☑️");
  //Starting to work on cooldown
  //fishCooldown[message.author.username] =
}
function give(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedNumber = parseInt(args[1], 10);
  const taggedUser = message.mentions.users.first();
  if (
    isNaN(savedNumber) ||
    savedNumber > currencyBalance[message.author.username]
  ) {
    return message.reply(
      "Thats not how it works. Your command should look like `&give 20 @Kings assistant. (You also might be trying to give more than you have)`"
    );
  }
  updateCurrencyBalance(message.author.username, -savedNumber);
  updateCurrencyBalance(taggedUser.username, savedNumber);
  message.reply(`you gave ${savedNumber} Kinogalons to ${taggedUser}.`);
}
function highLow(message) {
  let hint = Math.ceil(Math.random() * 99);
  let realNumber = Math.ceil(Math.random() * 80 + 10);
  const victoryMoney = Math.floor(Math.random() * 100) + 83;
  const highLowEmbed = new Discord.MessageEmbed()
    .setColor("#d1e334")
    .setTimestamp()
    .setDescription("`High` or `Low`")
    .addFields({ name: "Hint", value: `${hint}` });
  message.channel.send(highLowEmbed);
  const fullEmbed = new Discord.MessageEmbed()
    .setColor("#d1e334")
    .setTimestamp()
    .setDescription("`High` or `Low`")
    .addFields(
      { name: "Hint", value: `${hint}` },
      { name: "Real Number", value: `${realNumber}` }
    );
  message.channel
    .awaitMessages((m) => m.author.id == message.author.id, {
      max: 1,
      time: 30000,
    })
    .then((collected) => {
      if (collected.first().content.toLowerCase() == "high") {
        message.channel.send(fullEmbed);
        if (hint < realNumber) {
          message.reply(`Correct! You win ${victoryMoney} Kinogalons`);
          updateCurrencyBalance(message.author.username, victoryMoney);
        } else {
          message.reply("Incorrect!!");
        }
      } else if (collected.first().content.toLowerCase() == "low") {
        message.channel.send(fullEmbed);
        if (hint > realNumber) {
          message.reply(`Correct! You win ${victoryMoney} Kinogalons`);
          updateCurrencyBalance(message.author.username, victoryMoney);
        } else {
          message.reply("Incorrect!!");
        }
      } else {
        message.reply("That was not an option, ending highlow");
      }
    }, 2000);
}
module.exports = {
  betSlots,
  hackCurrency,
  risk,
  work,
  profile,
  beg,
  fish,
  give,
  updateCurrencyBalance,
  getCurrencyBalance,
  highLow,
};
