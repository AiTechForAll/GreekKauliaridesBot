const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Start age verification"),

  async execute(interaction) {
    await interaction.reply({
      content: "📩 Έλεγξε τα DM σου για την επαλήθευση.",
      ephemeral: true
    });

    try {
      await interaction.user.send(
        "👋 Για να κάνεις verify:\n\n" +
        "1️⃣ Στείλε την ηλικία σου\n" +
        "2️⃣ Στείλε μια φωτογραφία για επιβεβαίωση\n\n" +
        "Μόλις σταλούν, θα πάνε για έλεγχο από staff."
      );
    } catch {
      await interaction.followUp({
        content: "❌ Δεν μπορώ να σου στείλω DM. Άνοιξε τα DM από server members.",
        ephemeral: true
      });
    }
  }
};
