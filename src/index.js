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

      client.on(event.name, (...args) => 
        event.execute(...args)
      );

    }
  }
}


// COMMANDS + BUTTONS
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

      if (!interaction.replied) {
       await interaction.reply({
content:"Command error.",
flags:64
}); 
        git add .
git commit -m "fix verify interaction"
git push
      }
    }
  }

});


client.once('clientReady', () => {
  console.log(`${client.user.tag} is online`);
});


client.login(process.env.TOKEN);
