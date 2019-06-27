const langs = require("../langs.json");
const db = require("quick.db")

// Moon_Buster & baris
exports.run = async (client, message, args) => {
  var mentionedMember = message.mentions.members.first();
  var Reason = args.slice(1).join(" ");
  const lang = await db.fetch(`lang_${message.author.id}`)
  if (!lang) db.set(`lang_${message.author.id}`, "EN")
  if (!mentionedMember) return message.channel.send(langs[lang].kick.member);
  if (!Reason) return message.channel.send(langs[lang].kick.reason)
  mentionedMember.kick(Reason);
  var mSend = (langs[lang].kick.memberSend).replace("%guild%", message.guild.name).replace("%reason%", Reason);
  var gSend = (langs[lang].kick.guildSend).replace("%member%", mentionedMember).replace("%reason%", Reason)
  mentionedMember.send(mSend)
  message.channel.send(gSend)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kick"],
  permLevel: 2,
  cat:   "Moderation"
}

exports.help = {
  name: "kick",
  description: "Kicks someone.",
  usage: "kick <member> <reason>"
}