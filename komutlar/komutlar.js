const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    
    const agacıkoktanottomanıgötten = new Discord.MessageEmbed()
    .setTitle(`Hera  - Komut Sayısı`)
    .setDescription('**\n Hera Bot | Toplam**  **`' + client.commands.size + '`** **Komut Bulunmakta!**')
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Hera  " , client.user.avatarURL())

    return message.channel.send(agacıkoktanottomanıgötten);
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:[],
    permlevel: 0
};

exports.help = {
    name: "komutlar"
}