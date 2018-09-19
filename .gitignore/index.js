const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

// Connection du bot:
// https://discordapp.com/oauth2/authorize?client_id=488318579758858262&permissions=8&scope=bot

bot.on('ready', async () => {
    console.log(`${bot.user.username} est connecté !`);
    bot.user.setActivity("la matrice du serveur.", {type: "WATCHING"});
});

bot.on("message", async msg => {
    if(msg.author.bot) return;
    let modoprefix = "..";
    let prefix = ".";
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let proposchannel = bot.channels.find('name', "proposition");
    var lock = true;
    let logs = bot.channels.find('name', "logs");



    if(msg.channel.type === "dm"){
      if(cmd === prefix + "help"){
        let privatehelpembed = new Discord.RichEmbed()
        .setTitle("__Aide sur les commandes dans les messages privés__")
        .setDescription("Ici, vous trouverez toutes les commandes nécessaires dans les messages privés !")
        .addBlankField()
        .setFooter("Fin de la liste des commandes dans les messages privés !")
        .addField(prefix + "help", "Donne une liste des commandes disponibles.", true);
        msg.channel.send(privatehelpembed);
        return;
      }
      else {
        msg.reply("Désolé, je ne suis pas paramétré pour ce **genre de demandes**...\n`Ou peut être vous êtes vous trompez dans les commandes, dans ce cas -> " + prefix + "help`");
        return;
      }
    }

    if(cmd === "modo!clear"){
      let channelsendclearlog = bot.channels.find('name', "logs");
      if(msg.channel.id === channelsendclearlog.id){
        msg.delete(5000);
        msg.channel.send(`Il est impossible de clear les logs ${msg.author}`).then(msg => msg.delete(5000));
        return;
      }
      if(!messageArray[1]){
        msg.delete(5000);
        msg.channel.send(`Merci d'indiquer le nombre de messages que je dois supprimer ${msg.author} !`).then(msg => msg.delete(5000));
        return;
      }
      if(messageArray[2]){
        msg.delete(5000);
        msg.channel.send(`${msg.author}, tu m'as donné trop d'informations !`).then(msg => msg.delete(5000));
        return;
      }
      let embedlogclear = new Discord.RichEmbed()
      .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL)
      .setTitle("Clear de messages !")
      .setColor("#6bf442")
      .addField("Envoyé dans", "#" + msg.channel.name)
      .addField("Envoyé par", msg.author)
      .addField("Messages enlevés", args[0])
      .setFooter(msg.createdAt);
      if(!channelsendclearlog) {
          msg.delete(0);
          return msg.reply("Merci de bien vouloir créer un channel #logs").then(msg => msg.delete(1000));
      }
      bot.channels.get(channelsendclearlog.id).send(embedlogclear);
      msg.channel.bulkDelete(args[0]).then(() => {
          msg.channel.send(`${args[0]} messages ont été enlevés !`).then(msg => msg.delete(5000));
      });
    }



    if(msg.channel.id === '488316646981763072'){
      let sayargs = args.join(" ");

      if(lock === false){
        if(cmd === "azura!proposition"){
          if(!args) {
            let embedpropositionnone = new Discord.RichEmbed()
            .addField("", `${msg.author}, merci de bien indiquer une proposition`, true)
            .setColor("#ce002c");
            msg.channel.send(embedpropositionnone).then(msg => msg.delete(5000));
            msg.delete(5000);
            return;
          }
          let embedproposition = new Discord.RichEmbed()
          .setTitle("Nouvelle proposition")
          .addField("Auteur", `${msg.author}`, true)
          .addField("proposition", `${sayargs}`)
          .setColor("#ce002c");
          bot.channels.get(proposchannel.id).send(embedproposition);
          let msgembedproposition = new Discord.RichEmbed()
          .addField("Succès de la commande !", `${msg.author}, votre proposition a bien été envoyée`)
          .addField("Proposition", sayargs)
          .setColor("#ce002c");
          msg.author.send(msgembedproposition);
          msg.delete(0);
          return;
        }
      }
      if(lock === true){
        let msgembedpropositionrefusee = new Discord.RichEmbed()
        .addField("Refus de la commande !", `${msg.author}, les propositions sont **momentanément arrêtées** !`)
        .setColor("#ce002c");
        msg.author.send(msgembedpropositionrefusee);
        msg.delete(0);
        console.log(`\n${msg.author.username} a tenté d'envoyer une proposition: ${sayargs}\n`);
        return;
      }
    }

    if(msg.channel.id === '490227791099592717'){
      if(cmd === "open/prop"){
        if(!args[1]){
          let noargs = new Discord.RichEmbed()
          .setDescription("Veuillez indiquer une proposition " + msg.author + " !")
          .setColor("#ff4f4f");
          msg.delete(5000);
          msg.channel.send(noargs).then(msg => msg.delete(5000));
          return;
        }
        let sucess = new Discord.RichEmbed()
        .setDescription("Proposition envoyée " + msg.author + " !")
        .setColor("#ff4f4f");
        msg.delete(5000);
        msg.channel.send(sucess).then(msg => msg.delete(5000));
        let opensay = args.join(" ");
        let openprop = new Discord.RichEmbed()
        .addField("Auteur", msg.author, true)
        .addField("Proposition", opensay)
        .setColor("#ff4f4f");
        bot.channels.get("490227816831647744").send(openprop);
        return;

      }
      else {
        msg.delete(5000);
        let dunno = new Discord.RichEmbed()
        .setDescription("Commande inconnue " + msg.author + " !")
        .setColor("#ff4f4f");
        msg.channel.send(dunno).then(msg => msg.delete(5000));
        return;
      }
    }

    if(msg.channel.id === "490227816831647744"){
      if(cmd === "prop"){
        let rUser = msg.guild.member(msg.mentions.users.first() || msg.guild.member.get(args[0]));
        let args2 = messageArray.slice(2);
        let opensay2 = args2.join(" ");
        let openprop2 = new Discord.RichEmbed()
        .setTitle("Nouvelle proposition :tada:")
        .setThumbnail(rUser.displayAvatarURL)
        .addField("Auteur", args[0], true)
        .addField("Proposition", opensay2)
        .setColor("#ff4f4f");
        bot.channels.get("490227775379210241").send(openprop2);
        return;

      }
      else {
        return;
      }
    }
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'logs');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member} [avec l'id: ${member.id}]`);
});

bot.login("NDg4MzE4NTc5NzU4ODU4MjYy.DnaelA.LMLFmNU55IvqlfrlRqlgMyPBOmI");
