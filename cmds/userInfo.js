const Discord = require('discord.js');
var db = require('quick.db');
// Moon_Buster With help from Baris

exports.run = async (client, message, args) => {
  var mentionedUser = message.mentions.users.first() || message.author;
  var warn =  await db.fetch(`warns_${mentionedUser.id}`);
  var count = await db.fetch(`warnCount_${mentionedUser.id}`);
  var nick = message.guild.members.get(mentionedUser.id).displayName
  const embed = new Discord.RichEmbed()
    .setThumbnail(mentionedUser.avatarURL)
    .addField('Full name', mentionedUser.tag, true)
    .addField('ID', mentionedUser.id, true)
    .addField('Nickname', nick ? nick : mentionedUser.username, true)
    .addBlankField()
    .addField("Warns:", count ? count : "0", true)
    .addField("warn reasons: ", warn ? warn : "No warns", true);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['userInfo', 'user', 'userinfo'],
  permLevel: 0,
  cat: "Misc"
}

exports.help = {
  name: 'userInfo',
  description: "",
  usage: '?userInfo <User>'
}