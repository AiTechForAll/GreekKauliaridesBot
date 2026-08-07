const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Start age verification"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Age Verification")
      .setDescription(
        "Check your DMs. Send your age and a photo to complete verification."
      )
      .setColor("Blue");

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });

    try {
      await interaction.user.send(
        "Hello! To verify your age, send your age and a photo. Your information will be reviewed by staff."
      );
    } catch {
      await interaction.followUp({
        content: "I cannot DM you. Enable direct messages from server members.",
        ephemeral: true
      });
    }
  }
};
