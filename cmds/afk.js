const Discord = require('discord.js');
const db = require('quick.db');
const lang = require('../langs.json');

exports.run = async (client, message, args) => {
  
  //Baris & Moon_Buster
  
  let user = message.author;
  let reason = args.join(" ");
  
  const selectedLang = db.get(`lang_${user.id}`);
  if (!selectedLang) db.set(`lang_${message.author.id}`, "EN")
   if (!reason) return message.channel.send(lang[selectedLang].afk.reason); 
   db.set(`afk_${user.id}`, reason)
   message.channel.send(lang[selectedLang].afk.confirmed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  cat: "Misc"
}

exports.help = {
  name: 'afk',
  description: "Sets you as Away From Keyboard (AFK).",
  usage: 'afk <reason>'
}