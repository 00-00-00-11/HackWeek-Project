const db = require("quick.db");
const langs = require("../langs.json");
// Baris
exports.run = async (client, message, args) => {
  const lang = await db.fetch(`lang_${message.author.id}`)
  if (!lang) db.set(`lang_${message.author.id}`, "EN")
const limit = args[0] ? args[0] : 0;
  if(!limit) {
            message.channel.send(langs[lang].slowmode.number);
            return
          }
if (limit > 10) {
    return message.channel.send(langs[lang].slowmode.limit);
}
  var sMsg = (langs[lang].slowmode.confirmed).replace("%limit%", limit)
    message.channel.send(sMsg);
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})



};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slow-mode"],
  permLevel: 2,
  cat: 'Moderation'
};

exports.help = {
  name: 'slowmode',
  description: 'Enables or disables the write limit.',
  usage: 'slowmode',
};