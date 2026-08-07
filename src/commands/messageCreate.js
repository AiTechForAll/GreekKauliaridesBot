const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  name: "messageCreate",

  async execute(message) {
    if (message.guild) return;
    if (message.author.bot) return;

    if (!message.attachments.size) return;

    const channel = await message.client.channels.fetch(
      "1535207011585757184"
    );

    const embed = new EmbedBuilder()
      .setTitle("New Age Verification")
      .setDescription(
        `User: <@${message.author.id}>\n\n` +
        `Message:\n${message.content}`
      )
      .setImage(message.attachments.first().url)
      .setColor("Blue");

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`approve_${message.author.id}`)
        .setLabel("✅ Approve")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`deny_${message.author.id}`)
        .setLabel("❌ Deny")
        .setStyle(ButtonStyle.Danger)
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
