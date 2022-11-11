const Discord = require("discord.js");
const { prefix, token } = require("../config.json");

let jokeCooldown = {};

function jokeTime(message) {
  const userJokeCooldown = jokeCooldown[message.author.username];
  const now = Date.now();
  if (userJokeCooldown && now < userJokeCooldown) {
    return message.channel.send(
      `Do you think I am a joke machine? Wait ${(
        (userJokeCooldown - now) /
        1000
      ).toFixed(1)} more seconds.`
    );
  }
  let jokeArray = [
    "Why do we tell actors to break a leg?\n||Because every play has a cast.||",
    "Did you hear about the claustrophobic astronaut?\n||He needed a little space||",
    "Where are average things manufactured?\n||The satisfactory.||",
    "What does a nosy pepper do?\n||Gets jalapeño business!||",
    "Why can’t you explain puns to kleptomaniacs?\n||They always take things literally.||",
    "A man tells his doctor, Doc, help me. I’m addicted to Twitter!\n||The doctor replies, “Sorry, I don’t follow you …”",
    "What do you call a parade of rabbits hopping backwards?\n||A receding hare-line.||",
    "What did the bald man exclaim when he received a comb for a present?\n||Thanks— I’ll never part with it!||",
    "What did the left eye say to the right eye?\n||Between you and me, something smells.||",
    "What do you call a fake noodle?\n||An impasta||",
    "What do you call a pony with a cough?\n||A little horse.||",
    "What did the shark say when he ate the clownfish?\n||This tastes a little funny.||",
    "Why can’t you hear a pterodactyl go to the bathroom?\n||Because the “P” is silent.||",
    "Why did the frog take the bus to work today?\n||His car got toad away.||",
    "What is an astronaut’s favorite part on a computer?\n||The space bar.||",
    "How do poets say hello?\n||Hey, haven’t we metaphor?||",
    "Why did the Oreo go to the dentist?\n||Because he lost his filling.||",
    "Why is it annoying to eat next to basketball players?\n||They dribble all the time.||",
    "What breed of dog can jump higher than buildings?\n||Any dog, because buildings can’t jump.||",
    "How many times can you subtract 10 from 100?\n||Once. The next time you would be subtracting 10 from 90.||",
    "Why did the M&M go to school?\n||It wanted to be a Smartie.||",
    "Why aren’t koalas actual bears?\n||They don’t meet the koalafications.||",
    "Why did the nurse need a red pen at work?\n||In case she needed to draw blood.||",
    "How do you throw a space party?\n||You planet.||",
    "The numbers 19 and 20 got into a fight.\n||21||",
    "Why did it get so hot in the baseball stadium after the game?\n||All of the fans left.||",
    "Why did the gym close down?\n||It just didn’t work out.||",
    "Two artists had an art contest.\n||It ended in a draw.||",
    "What type of sandals do frogs wear?\n||Open-toad.||",
    "How do you count cows?\n||With a cowculator.||",
    "Why are skeletons so calm?\n||Because nothing gets under their skin.||",
    "Why couldn’t the leopard play hide and seek?\n||Because he was always spotted.||",
    "What do you call a bear with no teeth?\n||A gummy bear.||",
    "How do trees get online?\n||They just log on.||",
    "Where do fish sleep?\n||In the riverbed.||",
    "Did you hear about the kidnapping at school?\n||It’s okay. He woke up.||",
  ];
  let jokePicker = Math.floor(Math.random() * jokeArray.length);
  let joke = jokeArray[jokePicker];
  const jokeNumber = jokePicker + 1;
  const jokeEmbed = new Discord.MessageEmbed()
    .setColor("#31cc62")
    .addFields({ name: "Joke", value: `${joke}` })
    .setFooter(`Joke #${jokeNumber}`)
    .setAuthor(message.author.username);
  message.channel.send(jokeEmbed);
  jokeCooldown[message.author.username] = Date.now() + 5 * 1000;
}

module.exports = jokeTime;
