const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("#140589")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle(":hammer:   Hera  | Moderasyon Menüsü  :hammer: ")
.setThumbnail("https://cdn.discordapp.com/emojis/727894683061321759.gif?v=1")
    .setDescription(`


╔════════════════════════════╗
║
║**»** **!sa-as** : Sa-As sistemini açar
║**»** **!jail** : Jail Sistemi
║**»** **!mute** : Etiketlediğiniz Kişiye Mute Atar
║**»** **!mute @kullanıcı <1s,1m,1h,1d>** : Süreli Mutelersiniz
║**»** **!unmute** : Etiketlenen Kişinin Mutesini Açar
║**»** **!ban** : Engelleme
║**»** **!caps** : Caps Lock Engel
║**»** **!nuke** : Kanalı Siler Tekrar Açar
║**»** **!slowmode** : Yavaş Mod
║**»** **!oylama** : Oylama
║**»** **!banlist** : Ban List
║**»** **!mesaj-log** : Mesajın düzenlenmeden yada silinmeden önceki hallerini gösterir
║**»** **!temizle** : Sohbeti Temizler
║**»** **!sunucu-kur** : Roller olmadan sunucu kurar
║**»** **!abone** : Belirttiğiniz Kişiye Abone Rolü Verilir
║**»** **!abone-rol** : Abone Rol Ayarlarsınız
║**»** **!abone-y-rol** : Abone Rolü Vericek Yetkili Rolünü Ayarlarsınız
║**»** **!abone-log** : Verilen Abone Rollerini Loglar
║
║**»** \`\`\!davet\`\`\ **__Botun Davet Linkini Görürsünüz.__**
║
╚════════════════════════════╝
`) 
       .addField(`» Hera Bot Bağlantıları`, ` [Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=803925896259043348&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/dKj85m3Pcv) **|** [WebSitesi](http://herabots.xyz/) `)
       .setImage("https://cdn.discordapp.com/attachments/789813402536509452/808819177862594560/standard_1.gif")
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["mod"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'moderasyon', 
    description: '',
    usage: ''
  };