//Jae
//Moon_Buster + Baris were stalking
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let baseURL = "https://wttr.in/";
  
  if(args.length < 1) {
    var url = baseURL + "Annecy.png?mp";
  } else {
    var url = baseURL + args.join("%20") + ".png?mp";
  }
    
  const embed = new Discord.RichEmbed()
    .setImage(url);
  
  message.channel.send(embed);
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["wtr"],
  permLevel: 0,
  cat: "Misc"
}

exports.help = {
  name: "weather",
  description: "Shows the weather in the specified area.",
  usage: "weather"
}