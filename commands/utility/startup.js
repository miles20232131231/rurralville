const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;
        const now = new Date();

        const embed = new EmbedBuilder()
            .setTitle('Ruralville | Session Startup')
            .setDescription(`<@${interaction.user.id}> is initiating a roleplay session. Please ensure you have reviewed the server information available in <#1283394336318558289>.

Before participating, make sure your vehicle is properly registered. To register your vehicle, use the /register command in <#1283394674685382729>.

This session will commence once this message receives ${reactions} or more reactions.`)
.setImage("https://cdn.discordapp.com/attachments/1282347649055592540/1284416549091934249/Screenshot_2024-09-14_014413.png?ex=66e68da0&is=66e53c20&hm=e6152d448d9965a2868743cd3e82ff6a2028d6547f5b762b48082e94fbc8eafd&")
.setColor('#f6f5f5')
.setFooter({
    text: 'Ruralville',
    iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
});

        const message = await interaction.channel.send({
            content: '@everyone',
            embeds: [embed]
        });

        await message.react('✅');

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Startup")
            .setDescription(`<@${interaction.user.id}> has initiated a roleplay session. The reactions have been set to ${reactions}.`)
            .setColor('#f6f5f5')
            .setFooter({
                text: 'Ruralville',
                iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
            });

        const targetChannel = await interaction.client.channels.fetch('1284908444800782357');
        await targetChannel.send({ embeds: [newEmbed] });

        const reactionFilter = (reaction, user) => reaction.emoji.name === '✅';
        const reactionCollector = message.createReactionCollector({ filter: reactionFilter, time: 86400000 });

        reactionCollector.on('collect', (reaction) => {
            console.log(`Collected ${reaction.count} reactions`);
            if (reaction.count >= reactions) {
                const settingUpEmbed = new EmbedBuilder()
                    .setDescription('Setting up!');

                interaction.channel.send({ embeds: [settingUpEmbed] });
                reactionCollector.stop();
            }
        });

        reactionCollector.on('end', collected => {
            console.log(`Collector ended. Total reactions: ${collected.size}`);
        });

        await interaction.reply({ content: `You have initiated a session successfully.`, ephemeral: true });
    },
};
