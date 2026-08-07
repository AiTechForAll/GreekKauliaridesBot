const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {

    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      await command.execute(interaction);
    }


    if (interaction.isButton()) {

      const [action, userId] = interaction.customId.split("_");

      const member = await interaction.guild.members.fetch(userId);

      if (action === "approve") {

        await member.roles.add("1535191223323725844");

        await interaction.reply({
          content: "✅ User approved and Member role added.",
          ephemeral: true
        });

        await member.send(
          "✅ Your verification has been approved!"
        );

      }


      if (action === "deny") {

        await interaction.reply({
          content: "❌ User denied.",
          ephemeral: true
        });

        await member.send(
          "❌ Your verification has been denied."
        );

      }
    }
  }
};

