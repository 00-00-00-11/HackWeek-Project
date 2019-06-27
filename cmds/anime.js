const Discord = require('discord.js');
const langs = require('../langs.json'); 
const malScraper = require('mal-scraper');
const db = require("quick.db")
 
exports.run = async (client, message, args) => {

  let user = message.author;
  const selectedLang = db.get(`lang_${user.id}`);
  if (!selectedLang) db.set(`lang_${message.author.id}`, "EN");
  
  var query = args.slice("").join(0)
 
  if(!query){
    message.channel.send("please specify an anime name")
    return
  }
 malScraper.getInfoFromName(query)
  .then((data) =>  { 
  var ad = args[0]
  if(data.synonyms === "") {
    var dad = langs[selectedLang].anime.nosynonym
    } else {
      var dad = data.synonyms 
      }
  if(data.trailer === "undefined") {
    var trl = langs[selectedLang].anime.notrailer
    } else { 
      var trl = data.trailer
        message.channel.send(langs[selectedLang].anime.warning)
    
  }
 const emeded = new Discord.RichEmbed()

 .setAuthor(data.title)
 .addField(langs[selectedLang].anime.name, data.title)
 .addField(langs[selectedLang].anime.status, data.status) //status
 .addField(langs[selectedLang].anime.synonyms, dad) //synonyms
 .addField(langs[selectedLang].anime.MALrating, data.score) //MAL rating
 .addField(langs[selectedLang].anime.episodes, data.episodes) //episodes
 .addField(langs[selectedLang].anime.type, data.type) //type
 .addField(langs[selectedLang].anime.tags, data.genres) //labels
 .addField(langs[selectedLang].anime.episodetime, data.duration)
 .addField(langs[selectedLang].anime.MALladder, data.ranked)
 .addField(langs[selectedLang].anime.source, data.source)
 .addField(langs[selectedLang].anime.agerating, data.rating)
 .addField(langs[selectedLang].anime.MALpage, data.url)
 .addField(langs[selectedLang].anime.trailer, trl)
 .setFooter(langs[selectedLang].anime.footer)
 .setColor("RANDOM")
 const piccture = new Discord.RichEmbed()
   .setImage(data.picture)
 .setColor("RANDOM")
   message.channel.send(piccture)
 message.channel.send(emeded)
   })}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["malara","mal"],
  permLevel: 0,
  cat: "Fun"
};

exports.help = {
  name: 'anime',
  description: 'Come on! Lets look up some anime!',
  usage: 'anime <name> '
};
