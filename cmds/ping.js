//Baris
exports.run = (client, message) => {
  message.channel.send(`:ping_pong:**Pong!:** ${client.ping.toFixed()} ms`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p", "latency"],
  permLevel: 0,
  cat: "Misc"
}

exports.help = {
  name: "ping",
  description: "Shows the latency of the bot.",
  usage: "ping"
}