const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('partnership-embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('partnership-embed'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const embed2 = new EmbedBuilder()
            .setTitle('Partnership Embed')
            .setDescription(`- At Ruralville, we form partnerships with other communities to maximize growth for both parties. You can request a partnership with us in our assistance channel.

- If your community does not meet our requirements, you cannot partner with Ruralville. However, you can request a paid partnership, details of which are available in our ⁠server-regulations channel.

**__Your community must have over 10 members.__**

__Your community must be based on one of the following platforms: Greenville, Wisconsin; Southwest, Florida; Jupiter, Florida.__`)
.setColor('#f6f5f5')
    
        await interaction.channel.send({ embeds: [embed2] });

        await interaction.editReply({ content: 'Startup message sent.' });
    },
};
