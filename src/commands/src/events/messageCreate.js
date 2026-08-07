const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const verifications = new Map();

module.exports = {
  name: "messageCreate",

  async execute(message) {

 console.log("MESSAGE RECEIVED", message.author.tag);

 if (message.guild) return;
    // Μόνο DM
    if (message.guild) return;

    if (message.author.bot) return;


    const userId = message.author.id;


    // Αποθηκεύει ηλικία
    if (message.content && !message.attachments.size) {

      verifications.set(userId, {
        age: message.content
      });

      await message.author.send(
        "✅ Η ηλικία καταγράφηκε. Τώρα στείλε τη φωτογραφία σου."
      );

      return;
    }


    // Περιμένει φωτογραφία
    if (message.attachments.size) {

      const data = verifications.get(userId);

      if (!data) {
        return message.author.send(
          "❌ Πρώτα στείλε την ηλικία σου."
        );
      }


      const channel = await message.client.channels.fetch(
        "1535207011585757184"
      );


      const embed = new EmbedBuilder()
        .setTitle("📋 New Age Verification")
        .addFields(
          {
            name: "User",
            value: `<@${userId}>`
          },
          {
            name: "Age",
            value: data.age
          }
        )
        .setImage(message.attachments.first().url)
        .setColor("Blue");


      const buttons = new ActionRowBuilder()
        .addComponents(

          new ButtonBuilder()
            .setCustomId(`accept_${userId}`)
            .setLabel("✅ Accept")
            .setStyle(ButtonStyle.Success),

          new ButtonBuilder()
            .setCustomId(`deny_${userId}`)
            .setLabel("❌ Denied")
            .setStyle(ButtonStyle.Danger),

          new ButtonBuilder()
            .setCustomId(`dm_${userId}`)
            .setLabel("💬 DM Private")
            .setStyle(ButtonStyle.Primary)

        );


      await channel.send({
        embeds: [embed],
        components: [buttons]
      });


      await message.author.send(
        "✅ Τα στοιχεία σου στάλθηκαν για έλεγχο."
      );


      verifications.delete(userId);

    }

  }
};

    await message.author.send(
      "✅ Τα στοιχεία σου στάλθηκαν για έλεγχο."
    );

  }
};
