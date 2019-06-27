const Discord = require('discord.js');
const db = require("quick.db");
const langs = require("../langs.json");
// Moon_Buster
exports.run = async (client, message) => {
  const lang = await db.fetch(`lang_${message.author.id}`)
  if (!lang) db.set(`lang_${message.author.id}`, "EN")
  
  let d = new Date();
  
  const month = d.getMonth();
  var season = 'Season';
  
  if (month == '2' || month == '3' || month == '4') {
    season = langs[lang].date.spring;
  }
  if (month == '5' || month == '6' || month == '7') {
    season = langs[lang].date.summer;
  }
  if (month == '8' || month == '9' || month == '10') {
    season = langs[lang].date.autumn;
  }
  if (month == '11' || month == '0' || month == '1') {
    season = langs[lang].date.winter;
  }
  const embed = new Discord.RichEmbed()
    .addField(langs[lang].date.date, [[`${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`], [`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`]], true)
    .addField(langs[lang].date.currentSeason, season, true)
    .addField(langs[lang].date.fullDate, d)
    .setColor("RANDOM")
  message.channel.send(embed);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['time'],
  permLevel: 0,
  cat: "Misc"
}

exports.help = {
  name: 'date',
  description: "Shows you the current date and time",
  usage: 'date'
}