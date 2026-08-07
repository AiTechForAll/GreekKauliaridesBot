const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Start age verification"),

  async execute(interaction) {

    await interaction.deferReply({
      flags: 64
    });

    try {

      await interaction.user.send(
        "👋 Age Verification\n\n" +
        "Στείλε μου:\n" +
        "1️⃣ Την ηλικία σου\n" +
        "2️⃣ Μια φωτογραφία\n\n" +
        "Τα στοιχεία θα σταλούν στο staff για έλεγχο."
      );

      await interaction.editReply({
        content: "📩 Σου έστειλα DM για verification."
      });

    } catch(error) {

      console.error(error);

      await interaction.editReply({
        content: "❌ Δεν μπορώ να σου στείλω DM. Άνοιξε τα DM από server members."
      });

    }
  }
};
