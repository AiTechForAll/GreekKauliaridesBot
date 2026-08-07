const { 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require("discord.js");

module.exports = {
  name: "messageCreate",

  async execute(message) {

    // μόνο DM
    if (message.guild) return;

    // αγνοεί bot
    if (message.author.bot) return;


    // πρέπει να έχει κείμενο + φωτογραφία
    if (!message.content || !message.attachments.size) return;


    const channel = await message.client.channels.fetch(
      "1535207011585757184"
    );


    const embed = new EmbedBuilder()
      .setTitle("📋 New Age Verification")
      .addFields(
        {
          name: "User",
          value: `<@${message.author.id}>`
        },
        {
          name: "Age",
          value: message.content
        }
      )
      .setImage(message.attachments.first().url)
      .setColor("Blue");


    const buttons = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId(`accept_${message.author.id}`)
          .setLabel("✅ Accept")
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId(`deny_${message.author.id}`)
          .setLabel("❌ Denied")
          .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
          .setCustomId(`dm_${message.author.id}`)
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

  }
};
