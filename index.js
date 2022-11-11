const Discord = require("discord.js");
let { prefix, token } = require("./config.json");
const blackJack = require("./commands/blackjack");
const client = new Discord.Client();
const {
  betSlots,
  hackCurrency,
  risk,
  work,
  profile,
  beg,
  fish,
  give,
  highLow,
} = require("./commands/currency-commands");
const {
  help,
  helpPage2,
  helpPage3,
  hiddenDlskahfo,
  kjHelp,
  currencyHelp,
  modHelp,
} = require("./commands/help");
const jokeTime = require("./commands/joke");
const { warn } = require("./commands/mod");

let pendingTheoryTests = {};

client.once("ready", () => {
  console.log("Ready!");
  client.user
    .setActivity(`Command Prefix: kng`, { type: "PLAYING" })
    .catch(console.error);
});

// Client message handler
client.on("message", (message) => {
  if (message.content.startsWith(`${prefix}hack`)) return hackCommand(message);
  if (message.content === `${prefix}random-number`)
    return randomNumber(message);
  if (message.content === `${prefix}help`) return help(message);
  if (message.content === `${prefix}challenge`) return challenge(message);
  if (message.content === `${prefix}coin-flip`) return coinFlip(message);
  if (message.content === `${prefix}random-count`) return countStart(message);
  if (message.content === `${prefix}ping`) return ping(message);
  if (message.content === `${prefix}d20`) return d20(message);
  if (message.content === `${prefix}d6`) return d6(message);
  if (message.content === `${prefix}react-test`) return reactTest(message);
  if (message.content.startsWith(`${prefix}8ball`))
    return questionAwnser(message);
  if (message.content.startsWith(`${prefix}slap`)) return slapSmack(message);
  if (message.content.startsWith(`${prefix}number`)) return testNumber(message);
  if (message.content === `${prefix}free-slots`) return slotsStart(message);
  if (message.content === `${prefix}help2`) return helpPage2(message);
  if (
    message.content === `${prefix}hidden-dlskahfo` &&
    (message.author.username === "K!ng" ||
      message.author.username === "Speesword")
  )
    return hiddenDlskahfo(message);
  if (message.content === `${prefix}triple-slots`) return crazySlots(message);
  if (message.content === `${prefix}website-link`) return websiteLink(message);
  if (message.content.startsWith(`${prefix}prof`)) return profile(message);
  if (message.content === `${prefix}work`) return work(message);
  if (message.content.startsWith(`${prefix}slots`)) return betSlots(message);
  if (message.content === `${prefix}currency-help`)
    return currencyHelp(message);
  if (
    message.content.startsWith(`${prefix}add-money`) &&
    message.author.username === "K!ng"
  )
    return hackCurrency(message);
  if (message.content === `${prefix}theory-test`) return testResponse(message);
  if (message.content === "y" && pendingTheoryTests[message.author.username]) {
    delete pendingTheoryTests[message.author.username];
    message.channel.send("Woah it is!");
  }
  if (message.content === "n" && pendingTheoryTests[message.author.username]) {
    delete pendingTheoryTests[message.author.username];
    message.channel.send("Sorry. Its still a success.");
  }
  if (message.content === `${prefix}custom-emoji`)
    return customEmojiTest(message);
  if (message.content === `${prefix}risk`) return risk(message);
  if (message.content === `${prefix}cooldown`) return coolDownTest(message);
  if (message.content === `${prefix}beg`) return beg(message);
  if (message.content === `${prefix}fish`) return fish(message);
  if (message.content.startsWith(`${prefix}shiba-bomb`))
    return shibaSend(message);
  if (message.content.startsWith(`${prefix}give`)) return give(message);
  if (message.content === `${prefix}big-brain`) return bigBrain(message);
  if (message.content === `${prefix}sus`) return sus(message);
  /*if (message.content === "(╯°□°）╯︵ ┻━┻")
    return message.channel.send("┬─┬ ノ( ゜-゜ノ)");*/
  if (message.content.startsWith(`${prefix}kj`)) return blackJack(message);
  if (message.content.startsWith(`${prefix}embed`)) return argsTest(message);
  if (message.content === `${prefix}snipe`) return snipe(message);
  if (message.content === `${prefix}edit`) return editTest(message);
  if (
    message.content === `${prefix}shutdown` &&
    message.author.username === "K!ng"
  )
    return theoryTest2(message);
  if (message.content === `${prefix}help-kj`) return kjHelp(message);
  if (
    message.content.startsWith(`${prefix}prefix`) &&
    message.author.username === "K!ng"
  )
    return prefixSet(message);
  if (message.content === `${prefix}test-delete`) return testThing(message);
  if (message.content.startsWith(`${prefix}king-smack`))
    return superSlap(message);
  if (
    message.content.startsWith(`${prefix}status`) &&
    (message.author.username === "K!ng" ||
      message.author.username === "Speesword")
  )
    return statusChange(message);
  if (
    message.content.startsWith(`${prefix}prune`) &&
    (message.author.username === "K!ng" ||
      message.author.username === "Speesword")
  )
    return prune(message);
  if (
    message.content.startsWith(`${prefix}highlow`) ||
    message.content.startsWith(`${prefix}hl`)
  )
    return highLow(message);
  if (message.content === `${prefix}help3`) return helpPage3(message);
  if (message.content === `${prefix}joke`) return jokeTime(message);
  if (message.content === `${prefix}adminTest`) return adminTest(message);
  if (message.content.startsWith(`${prefix}warn`)) return warn(message);
  if (message.content === `${prefix}mod-help`) return modHelp(message);
  if (message.content === `${prefix}why`) return why(message);
  if (message.content.startsWith(`${prefix}poggers-bomb`))
    return pogBomb(message);
  if (message.content.startsWith(`${prefix}pancake`)) {
    return pancakeMan(message);
  }
  if (message.content.startsWith(`${prefix}roast`)) return roast(message);
  if (message.content == `hw`) return bwpog(message);
  if (message.content === `${prefix}connect4`) return connect(message);
  if (message.author.username === `He's a Bot`) return hesa(message);
});
//Hack command
async function hackCommand(message) {
  if (!message.mentions.users.size) {
    return message.reply("You need to mention someone to hack.");
  }
  const hackedUser = message.mentions.users.first();
  let msg = await message.channel.send(
    `Hacking ${hackedUser} <a:waiting:789507448687034433>`
  );
  setTimeout(() => {
    msg.edit("Stealing custom emojis <a:waiting:789507448687034433>");
  }, 1000);
  setTimeout(() => {
    msg.edit("Hacking servers <a:waiting:789507448687034433>");
  }, 3000);
  setTimeout(() => {
    msg.edit("Stealing youtube subscribers <a:waiting:789507448687034433>");
  }, 5000);
  setTimeout(() => {
    msg.edit("Hack complete");
  }, 7000);
  message.react("☑️");
}

//Random number command
function randomNumber(message) {
  let Number = Math.random();
  message.channel.send(`${Number}`);
  message.react("☑️");
}

//Challenge command. Takes 2 random numbers and compares them.
function challenge(message) {
  let playerNumber = Math.floor(Math.random() * 100);
  let botNumber = Math.floor(Math.random() * 100);
  if (playerNumber > botNumber) {
    message.channel.send(
      `You win! you got ${playerNumber} and The King got ${botNumber}!`
    );
  } else {
    message.channel.send(
      `Dang The King won. He got ${botNumber} and you got ${playerNumber}`
    );
  }
  console.log(`Challenge command used in ${message.guild.name}`);
  message.react("☑️");
}

//Coin flip command. Uses Math.random to flip a coin.
function coinFlip(message) {
  let headsNumber = Math.random();
  console.log(`coin flip command used ${message.guild.name}`);
  if (headsNumber >= 0.5) {
    message.channel.send(`${message.author.username} flipped heads`);
  } else {
    message.channel.send(`${message.author.username} flipped tails`);
    message.react("☑️");
  }
}

//Uses splice function to "splice" the numbers
function countStart(message) {
  let nouns = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];
  let picker = Math.floor(Math.random() * nouns.length);
  let noun = nouns.splice(0, picker);
  message.channel.send(noun);
  console.log(`random count command used in ${message.guild.name}`);
  message.react("☑️");
}

//Sends a fake ping
function ping(message) {
  let pingNumber = Math.ceil(Math.random() * 87);
  message.channel.send(`Ping is: ${pingNumber}ms`);
  console.log(`ping command used in ${message.guild.name}`);
  message.react("☑️");
}

//Rolls a d20 using Math.random
function d20(message) {
  let roll = Math.ceil(Math.random() * 20);
  message.channel.send(`${roll}`);
  console.log(`d20 command used in ${message.guild.name}`);
  message.react("☑️");
}

//Rolls a d6 using Math.random
function d6(message) {
  let d6Value = Math.ceil(Math.random() * 6);
  message.channel.send(`${d6Value}`);
  console.log(`d6 command used in ${message.guild.name}`);
  message.react("☑️");
}

//Reacts to the message. Test for reactions
function reactTest(message) {
  {
    message.react("😄");
  }
}

//8ball command
function questionAwnser(message) {
  let arrayOfWords = [
    "Yes",
    "No",
    "Outlook not so good",
    "cant say now",
    "You wish",
    "Definitely",
  ];
  let randomWord =
    arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
  message.channel.send(`${randomWord}`);
  message.react("☑️");
}

//slap command
function slapSmack(message) {
  if (!message.mentions.users.size) {
    return message.reply(
      "You need to mention someone to smack. Humans these days am I right??"
    );
  }
  const taggedUser = message.mentions.users.first();
  let slapDamage = Math.ceil(Math.random() * 200000000);
  if (taggedUser.username === "Kings assistant") {
    return message.reply("Ummmm... No");
  }
  message.channel.send(
    `*smack* You slapped ${taggedUser.username} dealing ${slapDamage} damage`
  );
  message.react("☑️");
}

//Input integer
function testNumber(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedNumber = parseInt(args[1], 10);
  message.reply(`The number you saved is ${savedNumber}`);
  message.react("☑️");
}

//Slots machine
function slotsStart(message) {
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

  if (a === b || a === c || c === b) {
    message.channel.send(`You win!`);
  } else {
    message.channel.send("You lose. HA!");
  }
  message.react("☑️");
}

//Slots machine where all 3 need to be the same
function crazySlots(message) {
  let tonsOfEmojis = [":rainbow:", ":apple:", ":hotdog:", ":fries:"];
  let slotA = tonsOfEmojis[Math.floor(Math.random() * tonsOfEmojis.length)];
  let slotB = tonsOfEmojis[Math.floor(Math.random() * tonsOfEmojis.length)];
  let slotC = tonsOfEmojis[Math.floor(Math.random() * tonsOfEmojis.length)];
  const string = `${slotA} ${slotB} ${slotC}`;
  const slotsEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`)
    .setColor("#ff0000")
    .setTitle("Slots")
    .setDescription("You need to get all 3 the same in order to win.")
    .addFields({ name: "Slots", value: `${string}` });
  message.channel.send(slotsEmbed);
  if (slotA === slotB && slotB === slotC) {
    message.channel.send("Winner!");
  } else {
    message.channel.send("Dang.");
  }
  message.react("☑️");
}

//sends a link to the KA website
function websiteLink(message) {
  message.reply(
    "The link to the Kings Assistant website: https://ocyb8bemoc.mobirisesite.com/"
  );
  message.react("☑️");
}

//takes a y/n response
function testResponse(message) {
  pendingTheoryTests[message.author.username] = true;
  message.channel.send("Is this a success? (y/n)");
  message.react("☑️");
}

function shibaSend(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedNumber = parseInt(args[1], 10);

  let i;
  let arrayofShibas = [];
  message.react("☑️");
  if (savedNumber > 25) {
    return message.reply(
      "The ammount of shibas must be less than or equal to `25`"
    );
  }
  for (i = 0; i < savedNumber; i++) {
    arrayofShibas.push("<:shiba:798217537212776488>");

    message.channel.send(arrayofShibas).catch((err) => {
      console.error(err);
      message.channel.send("Please enter a **number**");
    });
  }
}
function bigBrain(message) {
  message.channel.bulkDelete(1);
  message.channel.send("<:bigbrain:775747216169893918>");
  message.channel.send("Thats big brain");
}

function sus(message) {
  message.channel.bulkDelete(1);
  message.channel.send("<:SUS:798209580253052959>");
  message.channel.send("Thats sus...");
}

//Custom embed
function argsTest(message) {
  const jsonString = message.content.slice(prefix.length + 5).trim();
  try {
    const json = JSON.parse(jsonString);
    const msg = message.channel.send({ embed: { fields: json } });
    message.delete(msg);
  } catch (e) {
    message.reply(`Your embed failed. ${e.message}`);
  }
}

//Lol
function snipe(message) {
  message.react("🤣");
  message.reply("You really thought!! :rofl:");
  message.channel.send("I told you **NO**");
  console.log(`snipe command used in ${message.guild.name}`);
}

//Editing messages with an async function
async function editTest(message) {
  const normalMessage = await message.channel.send("Dlskahfo 478912738967");
  setTimeout(() => {
    normalMessage.edit("Dldldlskahfo");
  }, 1000);
  setTimeout(() => {
    normalMessage.edit("<a:Bludino:788776597905604628>");
  }, 2000);
  setTimeout(() => {
    normalMessage.edit("<a:waiting:789507448687034433> buffering...");
  }, 3000);
  setTimeout(() => {
    normalMessage.edit("Command fail. Shutting down...");
  }, 5000);
  setTimeout(() => {
    normalMessage.delete();
  }, 7000);
}

//Fast and easy way to await message
function theoryTest2(message) {
  message.reply(
    "The bot will now shut down.\n" + "Confirm with `yes` or deny with `no`."
  );
  message.channel
    .awaitMessages((m) => m.author.id == message.author.id, {
      max: 1,
      time: 30000,
    })
    .then((collected) => {
      if (collected.first().content.toLowerCase() == "yes") {
        message.reply("Shutting down...");
        client.destroy();
      } else if (collected.first().content.toLowerCase() == "no") {
        message.reply("Oh snap");
      } else {
        message.reply("That was not an option");
      }
    }, 2000);
}

//Sets prefix. Not really working
function prefixSet(message) {
  const args = message.content
    .slice(prefix.length + 6)
    .trim()
    .split(/ +/);
  prefix = args;
  if (args === null) {
    message.reply("You can't set the prefix to nothing");
  }
  message.channel.send(`Command prefix set to ${args}`);
}
//uses await message to see if you can delete messages out of order
function testThing(message) {
  const msg = message.channel.send("Can we delete this out of order?");
  message.channel
    .awaitMessages((m) => m.author.id == message.author.id, {
      max: 1,
      time: 30000,
    })
    .then((collected) => {
      if (collected.first().content.toLowerCase() == "yes") {
        message.delete(msg);
      } else if (collected.first().content.toLowerCase() == "no") {
        message.reply("Oh snap");
      } else {
        message.reply("That was not an option");
      }
    }, 2000);
}

function spam(message) {
  message.react("☑️");
  if (!message.mentions.users.size) {
    return message.reply("You need to mention someone to spam.");
  }
  const taggedSpam = message.user.mentions.first();
}

function superSlap(message) {
  if (message.author.username !== "K!ng") {
    return message.reply("Only **true** Kings can wield this power...");
  }
  const taggedUser = message.mentions.users.first();
  message.channel.send(
    `<@!748558292162314292> uses their King powers to destroy ${taggedUser} with a powerful slap. ${taggedUser} get **DESTROYED**.`
  );
}

function statusChange(message) {
  const args = message.content
    .slice(prefix.length + 6)
    .trim()
    .split(/ ,/);
  client.user.setActivity(`${args}`, { type: "PLAYING" }).catch(console.error);
  message.reply("status changed");
}

function prune(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const number = parseInt(args[1], 10);
  message.channel.bulkDelete(number + 1, true).catch((err) => {
    console.error(err);
    message.channel.send("Prune failed");
  });
}

function why(message) {
  const arrayOfWhyMemes = [
    "https://tenor.com/view/confused-white-persian-guardian-why-gif-11908780",
    "https://tenor.com/view/why-asking-confused-gif-4593721",
    "https://tenor.com/view/whyyyy-why-gif-19236077",
    "https://tenor.com/view/why-huh-but-why-gif-13199396",
    "https://tenor.com/view/why-frustrated-but-why-gif-8326982",
    "https://tenor.com/view/ajholmes-why-gif-19862120",
    "https://tenor.com/view/nph-why-whyyyyy-screaming-why-why-though-gif-15852261",
  ];
  let whySend =
    arrayOfWhyMemes[Math.floor(Math.random() * arrayOfWhyMemes.length)];
  const msg = message.channel.send(whySend);
  message.delete(msg);
}

function pogBomb(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedNumber = parseInt(args[1], 10);

  let i;
  let arrayofPoggers = [];
  message.react("☑️");
  if (savedNumber > 70) {
    return message.reply(
      "The ammount of poggers must be less than or equal to `70`"
    );
  }
  for (i = 0; i < savedNumber; i++) {
    arrayofPoggers.push("<:poggers:807677527547838494>");
  }

  message.channel.send(arrayofPoggers).catch((err) => {
    console.error(err);
    message.channel.send("Please enter a **number**");
  });
}

function pancakeMan(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const savedNumber = parseInt(args[1], 10);

  let i;
  message.react("☑️");
  if (savedNumber > 70) {
    return message.reply("Pancake man can only count up to 70");
  }
  for (i = 0; i < savedNumber; i++) {
    message.channel.send(
      "https://media.discordapp.net/attachments/741397640318550018/870760407722242079/image0.gif"
    );
  }
}

function roast(message) {
  if (!message.mentions.users.size) {
    return message.reply(
      "If you dont mention anyone to roast, I'm going to roast you."
    );
  }

  const roastedKid = message.mentions.users.first();
  let arrayRoast = [
    `Whoever told ${roastedKid} to be their self, gave them a bad advice.`,
    `Mirrors can't talk. Lucky for ${roastedKid}, they can't laugh either.`,
    `Light travels faster than sound, which is why ${roastedKid} seemed bright until they spoke.`,
  ];
  let roastPicker = Math.floor(Math.random() * arrayRoast.length);
  let roast = arrayRoast[roastPicker];
  message.channel.send(`${roast}`);
}
function bwpog(message) {
  message.channel.send("bruh are you BWP09 or something???");
}
function connect(message) {
  message.channel.send("hello");
  let l2;
  let l1;
  let mid;
  let r1;
  let r2;
  let connect4Embed = new Discord.MessageEmbed()
    .setColor("0000ff")
    .setAuthor(message.author)
    .setDescription(`${message.author}'s connect 4 game`);
  message.channel
    .awaitMessages((m) => m.author.id == message.author.id, {
      max: 1,
      time: 30000,
    })
    .then((collected) => {
      if (collected.first().content.toLowerCase() == "l2") {
        message.reply("token in l2");
        connect4Embed.addFields({ name: "token location", value: "l2" });
        message.channel.send(connect4Embed);
      } else if (collected.first().content.toLowerCase() == "l1") {
        message.reply("Connect 4 token going in l1");
        connect4Embed.addFields({ name: "token location", value: "l1" });
      } else if (collected.first().content.toLowerCase() == "mid") {
        message.reply("Connect 4 token going in the middle");
        connect4Embed.addFields({ name: "token location", value: "mid" });
      } else if (collected.first().content.toLowerCase() == "r1") {
        message.reply("Connect 4 token going in r1");
        connect4Embed.addFields({ name: "token location", value: "r1" });
      } else if (collected.first().content.toLowerCase() == "r2") {
        message.reply("Connect 4 token going in r2");
        connect4Embed.addFields({ name: "token location", value: "r2" });
      } else {
        message.reply(
          "https://media.discordapp.net/attachments/741397640318550018/870760407722242079/image0.gif"
        );
      }
    }, 2000);
}
function hesa(message) {
  message.reply("hesa shut up (!)");
}
client.login(token);
/*The money is called Kinogalons
This is the code for the reacting with a check: message.react('☑️');
Add this line into the if to make only Me and spencer be able to use it: && (message.author.username === 'Keegander_1210' || message.author.username === 'Speesword')
Put this in for args: const args = message.content.slice(prefix.length).trim().split(/ +/);
Then you need this const savedBetNumber = parseInt(args[1], 10); and saved number will be a number*/
