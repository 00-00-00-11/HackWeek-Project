const db = require('quick.db');
// Moon_Buster + Baris
exports.run = async (client, message, args) => {
  
  let user = message.author;
  let lang = args.join(" ");
  var oldLang = await db.fetch(`lang_${message.author.id}`)
  if(!oldLang) db.set(`lang_${message.author.id}`, "EN");
  const actions = ["EN", "TR", "AR", "DE", "FR", "KO", "EO"]; 
  if(lang === "EN") {
    db.set(`lang_${message.author.id}`, "EN")
    message.channel.send("Changed the language successfully.");
  } else if(lang === "TR") {
    db.set(`lang_${message.author.id}`, "TR")
    message.channel.send("Bot kullanım diliniz başarıyla Türkçe olarak ayarlanmıştır.");
  } else if(lang === "AR") {
    db.set(`lang_${message.author.id}`, "AR")
    message.channel.send(".تم اختيار الغة بنجاح");
  } else if(lang === "DE") {
    db.set(`lang_${message.author.id}`, "DE")
    message.channel.send("Die Sprache wurde erfolgreich geändert.");
  } else if(lang === "FR") {
    db.set(`lang_${message.author.id}`, "FR")
    message.channel.send("La langue a bien été changée sur Francais.");
  } else if(lang === "KO") {
    db.set(`lang_${message.author.id}`, "KO")
    message.channel.send("언어가 한국어로 변경되었습니다.");
  } else if(lang === "EO") {
    db.set(`lang_${message.author.id}`, "EO")
    message.channel.send("Ŝanĝis la lingvon sukcese.");
  }  else {
    message.channel.send("Please specify an option. Options: `EN, TR, AR, DE, FR, KO, EO`");
  }
  
 
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lang"],
  permLevel: 0,
  cat:   "Misc"
}

exports.help = {
  name: "language",
  description: "Sets the deffault language for you.",
  usage: "language <lang: English | Arabic>"
}