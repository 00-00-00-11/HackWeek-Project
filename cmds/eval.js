const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix) => {
  
  //Baris
  
  if(!args[0]) return
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let çıkış = (`\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(çıkış)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5,
    cat: "Misc"

};

exports.help = {
  name: 'eval',
  description: 'Evaluates JavaScript code.',
  usage: 'eval <code>'
};
