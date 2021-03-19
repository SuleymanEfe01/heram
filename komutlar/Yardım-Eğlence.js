const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("#140589")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle(":pushpin:     Hera  | Eğlence Menüsü   :pushpin: ")
.setThumbnail("https://cdn.discordapp.com/emojis/727894683061321759.gif?v=1")
    .setDescription(`


╔════════════════════════════╗
║
║**»** **!aduketçek** : Etiketlediğiniz kişiye aduket çeker
║**»** **!ara155** : Polis Geliyorrrr
║**»** **!beşlik** : Etiketlediğiniz kişiye beşlik çakar
║**»** **!efkarım** : Efkar seviyenizi belirler
║**»** **!hesapla** : Toplama çıkarma tarzı işlemler yapar
║**»** **!kaçcm** : Kaç cm olduğunu söyler
║**»** **!öp** : Etiketlediğiniz kişiyi öper
║**»** **!kralol** : Kral olursunuz
║**»** **!şekerye** : Şeker Yersin
║**»** **!kralol** : Kral olursunuz
║**»** **!olay** : Olay Çıkarırsınız
║**»** **!nahçek** : Nah Çekersiniz xD
║**»** **!kasaaç** : CS:GO kasası açarsınız
║**»** **!slots** : Farklı meyveyi bulma oyunu
║**»** **!meme** : Rastgele meme (miim) atar
║**»** **!trup** : Trump yerine tweet atar
║**»** **!taksimdayı** : Taksim dayı gifi atar
║**»** **!tokat-at** : Etiketlediğiniz kişiye tokat atar
║**»** **!kartopu** : Kartopu Atar
║**»** **!avatar** : Avatarınızı Gösterir
║**»** **!balıktut** : Balık Tutar
║**»** **!espiri** : Esrpiri Yapar
║**»** **!aşkölçer** : Aşkınızı Ölçer
║**»** **!mcödül** : Mc Ödül
║**»** **!herkesebendençay** : Herkese Çay Ismarlarsınız
║**»** **!mcskin** : Belirttiğiniz isime ait skini gösterir
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
    name: 'eğlence', 
    description: '',
    usage: ''
  };