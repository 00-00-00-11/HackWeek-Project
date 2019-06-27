const Discord = require('discord.js');
const db = require("quick.db");
const langs = require("../langs.json");
// Moon_Buster
exports.run = async (client, message, args) => {
  const lang = await db.fetch(`lang_${message.author.id}`)
  if (!lang) db.set(`lang_${message.author.id}`, "EN")
  const deleteCount = parseInt(args[0], 10) + 1;
  if (!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply(langs[lang].purge.count);
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  
  message.channel.bulkDelete(fetched).catch(error => {
    var errMsg = (langs[lang].purge.error).replace("%err%", error)
    message.channel.send(errMsg);
  });
}

//deleteCount error

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clear"],
  permLevel: 1,
  cat: "Moderation"
}

exports.help = {
  name: "purge",
  description: "Deletes messages.",
  usage: "purge <msg number>"
}