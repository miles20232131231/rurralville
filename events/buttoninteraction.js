const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'enter_giveaway') {
        // Handle entering the giveaway
        await interaction.reply({ content: 'You have entered the giveaway!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);