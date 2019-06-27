const Discord = require('discord.js');
var db = require('quick.db');

// Baris + Moon_Buster


exports.run = async (client, message, args) => {

  var user = message.mentions.members.first() || message.author;
  
  var userID = user.id
  
   var swear = await db.fetch(`swearCount_${userID}`);
   var serverSwear =  await db.fetch(`serverSwear_${userID}_${message.guild.id}`);
   var warn =  await db.fetch(`warns_${user.id}`);
   var count = await db.fetch(`warnCount_${user.id}`);

  var percentage = serverSwear*100/swear;
  
  var embed = new Discord.RichEmbed()
    .addField("Warn count:", count ? count : "0", true)
    .addField("Swear Count: ", serverSwear ? serverSwear + " (" + percentage.toFixed() + "% of all swears)" : "0" , true)
    .addField("Global Swear Count For User: ", swear ? swear : "0", true)
    .addField("warn reasons: ", warn ? warn : "No warns", true)
    .setFooter(`Displaying the warn list of ${user.tag}`)
  message.channel.send(embed);
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  cat: "Moderation"
}

exports.help = {
  name: 'warnList',
  description: "Warns a user.",
  usage: 'warnList'
}