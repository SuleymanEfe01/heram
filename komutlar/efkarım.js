const Discord = require("discord.js");

exports.run = (client, message) => {

const Hera = Math.floor(Math.random() * 100) + 1;

return message.channel.send(`**Hera** \n**Efkarınız:** **%${Hera}** **Efkar** `);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "efkarım",
  description: "Hera Bot | Efkarınızı ölçer",
  usage: "efkar Ölçer"
};
