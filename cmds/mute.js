const Discord = require('discord.js');
const db = require("quick.db");
const langs = require("../langs.json");
// Moon_Buster
exports.run = async (client, message, args) => {
  const lang = await db.fetch(`lang_${message.author.id}`)
  if (!lang) db.set(`lang_${message.author.id}`, "EN")
  var mentionedMember = message.mentions.members.first();
  if (!mentionedMember) return message.channel.send(langs[lang].mute.member);
  var time = args[0]
  if(!time) return message.channel.send(langs[lang].mute.muteTime)
  var aRole = message.guild.roles.find(x => x.name === "Muted");
  if(!aRole) return message.channel.send(langs[lang].mute.role)
  var roles = mentionedMember.roles.forEach(x => {
    mentionedMember.removeRole(x.id);
    mentionedMember.addRole(aRole.id); 
    var muteMsg = (langs[lang].mute.mutedMsg).replace("%member%", mentionedMember)
    message.channel.send(muteMsg).
    
    setTimeout(() => {
      mentionedMember.addRole(x.id);
      mentionedMember.removeRole(aRole.id)
      var unmuteMsg = (langs[lang].mute.unmutedMsg).replace("%member%", mentionedMember)
      message.channel.send(unmuteMsg);
    }, 1000*time)
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 2,
  cat:   "Moderation"
}

exports.help = {
  name: "tempmute",
  description: "mute someone.",
  usage: "tempmute <member> <time>"
}