require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  Collection
} = require('discord.js');

const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

client.commands = new Collection();


// LOAD COMMANDS
const commandPath = './src/commands';

if (fs.existsSync(commandPath)) {

  const files = fs.readdirSync(commandPath)
    .filter(file => file.endsWith('.js'));

  for (const file of files) {

    const command = require(`./commands/${file}`);

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }

  }
}


// LOAD EVENTS
const eventPath = './src/events';

if (fs.existsSync(eventPath)) {

  const eventFiles = fs.readdirSync(eventPath)
    .filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {

    const event = require(`./events/${file}`);

    if (event.name && event.execute) {

      client.on(event.name, (...args) => {
        event.execute(...args);
      });

    }

  }
}


// SLASH COMMANDS + BUTTONS
client.on('interactionCreate', async interaction => {


  // SLASH COMMANDS
  if (interaction.isChatInputCommand()) {

    const command = client.commands.get(
      interaction.commandName
    );

    if (!command) return;

    try {

      await command.execute(interaction);

    } catch(error) {

      console.error(error);

      if (interaction.deferred || interaction.replied) {

        await interaction.editReply({
          content: "❌ Command error."
        });

      } else {

        await interaction.reply({
          content: "❌ Command error.",
          flags: 64
        });

      }

    }

  }


  // BUTTONS
  if (interaction.isButton()) {

    const [action, userId] = interaction.customId.split("_");

    const user = await client.users.fetch(userId);


    if (action === "accept") {

      const member = await interaction.guild.members.fetch(userId);

      await member.roles.add(
        "1535191223323725844"
      );

      await user.send(
        "✅ Your verification was accepted!"
      );

      await interaction.reply({
        content: "✅ User accepted and role added.",
        flags: 64
      });

    }


    if (action === "deny") {

      await user.send(
        "❌ Your verification was denied."
      );

      await interaction.reply({
        content: "❌ User denied.",
        flags: 64
      });

    }


    if (action === "dm") {

      await user.send(
        "💬 Staff wants to talk with you about your verification."
      );

      await interaction.reply({
        content: "💬 DM sent to user.",
        flags: 64
      });

    }

  }

});


client.once('clientReady', () => {
  console.log(`${client.user.tag} is online`);
});


client.login(process.env.TOKEN);
