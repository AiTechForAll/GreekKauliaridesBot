module.exports = {
  name: 'help',
  description: 'Shows bot commands',
  async execute(interaction) {
    await interaction.reply({
      content: 'Commands: /ping /verify /help',
      ephemeral: true
    });
  }
};
