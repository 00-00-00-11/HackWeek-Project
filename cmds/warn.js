const Discord = require('discord.js');
var db = require('quick.db');

//
// This is the worst code ever - Jae, 22/06/2019, 11h00 (Paris time)
//
// Not anymore :D - Jae, 22/06/2019, 18h08 (Paris time)
// 
//  I'm gonna fix it :D - Baris 22/06/2019 19h46 (Turkey time)
//
// Fixed - Baris 22/06/2019 20h17 (Turkey time)

exports.run = async (client, message, args) => {
  
  var warner = message.author;
  var warned = message.mentions.members.first();
  if(!warned) return message.channel.send('Please specify someone to warn.');
  
  var reason = args.slice(1).join("  ");
  if(!reason || reason.length < 1) return message.channel.send("Please specify a reason to warn this user.")
  else var warnReason = reason
  
  var userID = warned.id;
  
  var warns = await db.fetch(`warns_${userID}`);
  
  if(!warns) {
    db.set(`warns_${userID}`, warnReason + "\n");
    db.add(`warnCount_${userID}`, 1);
    message.channel.send(`${warner} warned ${warned} for \`${warnReason}\` !`);
    return
  } else {
    db.set(`warns_${userID}`, warns + warnReason + "\n");
    db.add(`warnCount_${userID}`, 1);

  message.channel.send(`${warner} warned ${warned} for \`${warnReason}\` !`);
  }

  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  cat: "Moderation"
}

exports.help = {
  name: 'warn',
  description: "Warns a user.",
  usage: 'warn <user> <reason>'
}