//Baris
exports.run = (client, message) => {
  /*
  
         _ _    _  _____ _______     _____   ____  _   _ _ _______       _____  ______ _      ______ _______ ______ 
      | | |  | |/ ____|__   __|   |  __ \ / __ \| \ | ( )__   __|     |  __ \|  ____| |    |  ____|__   __|  ____|
      | | |  | | (___    | |      | |  | | |  | |  \| |/   | |        | |  | | |__  | |    | |__     | |  | |__   
  _   | | |  | |\___ \   | |      | |  | | |  | | . ` |    | |        | |  | |  __| | |    |  __|    | |  |  __|  
 | |__| | |__| |____) |  | |      | |__| | |__| | |\  |    | |        | |__| | |____| |____| |____   | |  | |____ 
  \____/ \____/|_____/   |_|      |_____/ \____/|_| \_|    |_|        |_____/|______|______|______|  |_|  |______|
  
  */
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  cat: "Music"
}

exports.help = {
  name: "stop",
  description: "Stops the current playback and cleans the music queue and exits the voice channel.",
  usage: "stop"
}