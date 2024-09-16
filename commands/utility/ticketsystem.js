const { Permissions, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket22')
        .setDescription('Create a ticket')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {

        await interaction.reply({ content: 'Setting up ticket system...', ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1282347649055592540/1284416549091934249/Screenshot_2024-09-14_014413.png?ex=66e68da0&is=66e53c20&hm=e6152d448d9965a2868743cd3e82ff6a2028d6547f5b762b48082e94fbc8eafd&";

        const embed = new EmbedBuilder()
            .setTitle('Ruralville | Server Support')
            .setDescription(`Select the appropriate option from the dropdown menu to open your ticket, and be patient as our support team might be occupied. Submitting troll tickets will lead to a violation. After opening a ticket, you will receive further instructions.

                **__Before you open a ticket__**
                Please note opening troll tickets would result in a server mute and strike.
                Opening a ticket to ask for server assets would result in a warning and instant decline.`)
                .setColor('#f6f5f5')
                .setFooter({
                    text: 'Ruralville',
                    iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
                });
                

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Staff Report',
                    description: 'Report a staff member.',
                    value: 'staff_report',
                },
                {
                    label: 'Civilian Report',
                    description: 'Report a civilian.',
                    value: 'civ_report',
                },
                {
                    label: 'General Support',
                    description: 'Get general support.',
                    value: 'general_support',
                },
            ]);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        await interaction.channel.send({ embeds: [embed], components: [row], files: [image] });

        await interaction.editReply({ content: 'Ticket system setup complete!', ephemeral: true });
    },
};
