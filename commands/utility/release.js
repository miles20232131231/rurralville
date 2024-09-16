const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Releases the session for everyone to join.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that civilians may join.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('peacetime-status')
                .setDescription('Current peacetime status.')
                .addChoices(
                    { name: 'Peacetime On', value: 'On' },
                    { name: 'Peacetime Normal', value: 'Normal' },
                    { name: 'Peacetime Off', value: 'Off' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('frp-speed')
                .setDescription('FRP speeds.')
                .addChoices(
                    { name: '60', value: '60' },
                    { name: '70', value: '70' },
                    { name: '80 (should not be used frequently)', value: '80' }
                )
                .setRequired(true)),

    async execute(interaction) {
        try {
            const sessionLink = interaction.options.getString('session-link');
            const peacetimeStatus = interaction.options.getString('peacetime-status');
            const frpSpeed = interaction.options.getString('frp-speed');

            const embed = new EmbedBuilder()
                .setTitle('Ruralville | Session Release')
                .setDescription(`The session host has distributed the link to all participants. Click the button below to view and join the session. Should you encounter any issues or have questions, our support team is available to assist you promptly.

**__Session Information:__**

Session Host: <@${interaction.user.id}>
Peacetime Status: ${peacetimeStatus}
FRP Speeds: ${frpSpeed} MPH

Your participation is valued, and we wish you a smooth and enjoyable experience during the session.`)
.setImage("https://cdn.discordapp.com/attachments/1282347649055592540/1284416549091934249/Screenshot_2024-09-14_014413.png?ex=66e68da0&is=66e53c20&hm=e6152d448d9965a2868743cd3e82ff6a2028d6547f5b762b48082e94fbc8eafd&")
.setColor('#f6f5f5')
.setFooter({
    text: 'Ruralville',
    iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
});

            const button = new ButtonBuilder()
                .setLabel('Session Link')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('ls');

            const row = new ActionRowBuilder()
                .addComponents(button);

            const newEmbed = new EmbedBuilder()
                .setTitle("Session Release")
                .setDescription(`<@${interaction.user.id}> has released their session. The information below is the session information.
                    **FRP:**${frpSpeed}
                    **Peacetime:**${peacetimeStatus}
                    **Link**: ${sessionLink}`)
                    .setColor('#f6f5f5')
                    .setFooter({
                        text: 'Ruralville',
                        iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
                    });

            const logChannel = await interaction.client.channels.fetch('1284908444800782357');
            await logChannel.send({ embeds: [newEmbed] });

            await interaction.channel.send({ content: '@everyone', embeds: [embed], components: [row] });

            await interaction.reply({ content: 'You have successfully released the session.', ephemeral: true });

            const filter = i => i.customId === 'ls';
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.BUTTON, time: 9999999 });

            collector.on('collect', async i => {
                try {
                    await i.deferUpdate();

                    await i.followUp({ content: `**Link:** ${sessionLink}`, ephemeral: true });

                    const logEmbed = new EmbedBuilder()
                        .setTitle(`Session Link Button`)
                        .setDescription(`Button clicked by <@${i.user.id}>.`)
                        .setColor('#f6f5f5')
                        .setFooter({
                            text: 'Ruralville',
                            iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
                        });
    
        
                        
                    await logChannel.send({ embeds: [logEmbed] });
                } catch (error) {
                    console.error('Error responding to interaction:', error);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
    },
};
