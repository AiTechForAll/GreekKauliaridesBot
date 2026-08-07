const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  client.commands = new Map();

  const commandsPath = path.join(__dirname, '../commands');
  if (!fs.existsSync(commandsPath)) return;

  const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of files) {
    const command = require(`${commandsPath}/${file}`);
    client.commands.set(command.data.name, command);
  }
};
