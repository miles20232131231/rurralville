const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-point')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('checkpointembed'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const embed2 = new EmbedBuilder()
            .setTitle('Checkpoint-embed')
            .setDescription(`In this channel, you must ping the host during checkpoint procedures. This ensures there are no unauthorized participants in the session that could cause Fail Roleplay (FRP).

**Format:**

- **Your Username:**
- **Host Username:**`)
.setColor('#f6f5f5')
    
        await interaction.channel.send({ embeds: [embed2] });

        await interaction.editReply({ content: 'Startup message sent.' });
    },
};
