const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

      let Hera  = args[0]

  if (!Hera ) return message.reply(':warning: Bir Değer Belirtmedin! :warning:')
  if (isNaN(Hera )) return message.repy('Silme Değeri Sadece Rakamlardan Oluşabilir')
  
  if (Hera  < 0) return message.reply('0 dan Küçük Değer Belirtemezssin')
    if (Hera  < 1) return message.reply('1 dan Küçük Değer Belirtemezssin')
      if (Hera  < 2) return message.reply('2 den Küçük Değer Belirtemezssin')

  if(Hera > 100) return message.reply('100 den büyük bir değer belirtemezssin')
  
  
  message.channel.bulkDelete(Hera).then(() =>  {
 message.channel.send(`🚀 ${Hera} Mesaj Uzaya Gönderildi`)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["temizle"],
  permLevel: 2
};

exports.help = {
  name: "sil",
  description: "Kinda Code & Only V12.",
  usage: "sil"
};
