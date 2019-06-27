// Moon_Buster
exports.run = (client, message) => {
  message.channel.send('( ͡° ͜ʖ ͡°)');
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["lenny", "( ͡° ͜ʖ ͡°)"],
  permLevel: 0,
  cat: "Fun"
}

exports.help = {
  name: "lenny",
  description: "Sends the Lenny face ( ͡° ͜ʖ ͡°)",
  usage: "lenny"
}