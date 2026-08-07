const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows commands"),

  async execute(interaction) {
    await interaction.reply({
      content: "Commands: /verify /help",
      ephemeral: true
    });
  }
};
