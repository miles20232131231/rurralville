const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const process = require('process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays information about the bot.'),
    async execute(interaction) {
        // Fetch bot information
        const botName = interaction.client.user.username;
        const nodeVersion = process.version;
        const uptime = formatUptime(process.uptime());

        // Create the embed
        const botInfoEmbed = new EmbedBuilder()
            .setTitle('Bot Information')
            .addFields(
                { name: 'Bot Name', value: botName, inline: true },
                { name: 'Node Version', value: nodeVersion, inline: true },
                { name: 'Version', value: 'v1', inline: true },
                { name: 'Uptime', value: uptime, inline: true },
                { name: 'Developer', value: '<@1281995005334126598>', inline: true }
            )
            .setThumbnail("https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512")
            .setColor('#f3eeee');

        // Send the embed
        await interaction.reply({ embeds: [botInfoEmbed] });
    },
};

// Function to format the bot's uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
