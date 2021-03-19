const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const rexus = new Discord.MessageEmbed()
    .setColor("RANDOM")
     .setAuthor(`Yapımcım`)
    .setDescription('<@753674424716230807> | İşte Bot Geliştiricisi')
       .setImage("https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flame-logo&text=Suleyman+Efe+Ekim");
  message.channel.send(rexus);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yapımcım",
  description: "",
  usage: ""
};