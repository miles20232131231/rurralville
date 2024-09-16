require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] }); // Added GuildMembers intent
client.commands = new Collection();
client.commandArray = [];

// Handle events
const handleEvents = async () => {
  const eventFiles = fs.readdirSync(`./events`).filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client));
  }
};

// Handle commands
const handleCommands = async () => {
  const commandFolders = fs.readdirSync(`./commands`);
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.data.name, command);
      client.commandArray.push(command.data.toJSON());
    }
  }

  const clientId = "1284194702211420251"; 
  const guildId = "1249174255342714952"; 
  const rest = new REST({ version: "9" }).setToken(token);

  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: client.commandArray,
    });
    console.log("Slash commands uploaded");
  } catch (error) {
    console.error(error);
  }
};

client.handleEvents = handleEvents;
client.handleCommands = handleCommands;

// New member join event listener
client.on('guildMemberAdd', async (member) => {
  try {
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00FF00') // Customize the color
      .setTitle('Welcome to the Server!')
      .setDescription(`Hi ${member.user.username}, welcome to our server! We're glad to have you here.`)
      .setFooter({ text: 'Enjoy your stay!', iconURL: member.guild.iconURL() });

    // Send the embed to the specified channel (ID: 1284908409212244101)
    const channel = member.guild.channels.cache.get('1284908409212244101');
    if (channel) {
      await channel.send({ embeds: [welcomeEmbed] });
    } else {
      console.error('Channel not found');
    }
  } catch (error) {
    console.error('Could not send welcome message to the channel:', error);
  }
});

// Initialize and log in the client
(async () => {
  await client.handleEvents();
  await client.handleCommands();
})();

client.login(token);
