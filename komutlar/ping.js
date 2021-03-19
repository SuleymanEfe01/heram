//v12


const Discord = require('discord.js');


exports.run = function(client, message, embed, params) {
  const bymayfe = new Discord.MessageEmbed()

  .setColor('RED')
  .setImage('https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flame-logo&text='+ client.ws.ping +'%20Ping')

    message.channel.send(bymayfe);

};   
  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['ms'],
  permLevel: 0 
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};