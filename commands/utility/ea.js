const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('early')
        .setDescription('Sends the early access embed.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that EA people can join.')
                .setRequired(true)),
    async execute(interaction) {
        const sessionLink = interaction.options.getString('session-link');

        const embed = new EmbedBuilder()
            .setTitle('Ruralville | Early Access')
            .setDescription('Early Access is now Live! Nitro Boosters, members of the Emergency Services, and Content Creators can join the session by clicking the button below.\n\nPlease keep in mind that sharing the session link with anyone is strictly forbidden and may lead to penalties. We appreciate your cooperation in keeping our community secure and fair for everyone.')
            .setImage("https://cdn.discordapp.com/attachments/1282347649055592540/1284416549091934249/Screenshot_2024-09-14_014413.png?ex=66e68da0&is=66e53c20&hm=e6152d448d9965a2868743cd3e82ff6a2028d6547f5b762b48082e94fbc8eafd&")
            .setColor('#f6f5f5')
            .setFooter({
                text: 'Ruralville',
                iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
            });

        const button = new ButtonBuilder()
            .setLabel('Early Access')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('ea');

        const row = new ActionRowBuilder()
            .addComponents(button);

            const newEmbed = new EmbedBuilder()
            .setTitle("Session Early Access")
            .setDescription(`<@${interaction.user.id}> released early access. The link is provided below
                **Link**
                ${sessionLink}`)

        const targetChannel = await interaction.client.channels.fetch('1284908444800782357');
        await targetChannel.send({ embeds: [newEmbed] });


        await interaction.channel.send({ 
            content: '<@&1284908308246822953>, <@&1284908301137477794>, <@&1284908297786232960>', 
            embeds: [embed], 
            components: [row] 
        });

        await interaction.reply({ content: 'Early Access Sent.', ephemeral: true });

        const filter = i => i.customId === 'ea';
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

        collector.on('collect', async i => {
            const logChannel = interaction.guild.channels.cache.get('1284908444800782357');
            if (logChannel) {
                await logChannel.send(`Interaction collected from ${i.user.tag} at ${new Date().toISOString()}`);
            }

            if (i.member.roles.cache.has('1284908297786232960') || i.member.roles.cache.has('1284908308246822953') || i.member.roles.cache.has('1284908297786232960') || i.member.roles.cache.has('1284908297052487680')) {
                await i.reply({ content: `**Link:** ${sessionLink}`, ephemeral: true });
            } else {
                await i.reply({ 
                    content: 'You do not have permission to use this button.',   
                    ephemeral: true 
                });
            }
        });

        collector.on('end', async collected => {
            const logChannel = interaction.guild.channels.cache.get('1284908444800782357');
            if (logChannel) {
                await logChannel.send(`Collected ${collected.size} interactions.`);
            }
        });

        collector.on('error', async error => {
            const logChannel = interaction.guild.channels.cache.get('1284908444800782357');
            if (logChannel) {
                await logChannel.send(`Collector encountered an error: ${error}`);
            }
            console.error('Collector encountered an error:', error);
        });
    },
};
