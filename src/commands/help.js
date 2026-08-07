const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows bot commands"),

  async execute(interaction) {
    await interaction.reply({
      content: "Commands: /ping /verify /help",
      ephemeral: true
    });
  }
};
