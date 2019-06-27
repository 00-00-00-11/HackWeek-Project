const request = require("request").defaults({ encoding: null });
const isURL = require("is-url");
const Discord = require("discord.js");
const db = require("quick.db");
const langs = require("../langs.json");
// Baris
exports.run = async (client, message, args) => {
  const lang = await db.fetch(`lang_${message.author.id}`)
  if (!lang) db.set(`lang_${message.author.id}`, "EN")
  
  if(args[0]) {
  message.channel.startTyping();
  const url = isURL(args[0]) ? args[0] : `http://${args[0]}`;
  const screenshot = request(`https://image.thum.io/get/width/1920/crop/675/noanimate/${url}`);
  const screenshotEmbed = new Discord.RichEmbed()
    .setColor(client.color)
    .setURL(url)
    .attachFiles([{
      attachment: screenshot,
      name: "screenshot.png"
    }])
      .setImage("attachment://screenshot.png");
    message.channel.send(screenshotEmbed);
  } else {
    return message.channel.send(langs[lang].webshot.url);
  }
    message.channel.stopTyping();
    
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["webshot"],
  permLevel: 0,
  cat:  "Fun"
};

exports.help = {
  name: 'screenshot',
  description: 'Sends a screenshot about specified website.',
  usage: 'screenshot <website URL>'
};