const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup-message')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Startup msg'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const embed1 = new EmbedBuilder()
            .setTitle('Ruralville | Server Startup')
            .setDescription("> Hello, Welcome to <#1283397721163829261>.We are excited to have you participate in our roleplay sessions. To ensure a smooth experience for everyone, please take note of the following guidelines:")
            .setThumbnail("https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512")
            .setColor('#f6f5f5');

        const embed2 = new EmbedBuilder()
            .setTitle('Startup Information')
            .setDescription(`Session Notifications: All session notifications will be posted in this channel. You will be alerted when a new session begins, so there is no need to request session times or re-invites. We aim to keep everyone informed promptly and efficiently.

Role Management: To avoid disrupting the flow of our sessions, please do not inquire about session times or ask for re-invites. Instead, use the Session Ping button to receive notifications about session starts. This role will ensure you are automatically pinged with updates. Repeated requests or disruptions may result in a mute to maintain the quality of our roleplay environment.

Respect and Conduct: We ask for your cooperation in maintaining a respectful atmosphere. Please refrain from spamming or engaging in off-topic discussions in this channel. Your adherence to these guidelines helps create a positive experience for all participants.`)
.setColor('#f6f5f5')
.setFooter({
    text: 'Ruralville',
    iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
});

        await interaction.channel.send({ embeds: [embed1, embed2] });

        await interaction.editReply({ content: 'Startup message sent.' });
    },
};
