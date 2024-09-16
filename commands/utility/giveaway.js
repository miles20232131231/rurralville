const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const ms = require('ms'); // For handling time durations

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Start a giveaway.')
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('The prize for the giveaway')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Embed title')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('winners')
                .setDescription('Number of winners')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration of the giveaway (e.g., 1h, 1d)')
                .setRequired(true)),

    async execute(interaction) {
        const prize = interaction.options.getString('prize');
        const winners = interaction.options.getInteger('winners');
        const duration = interaction.options.getString('duration');
        const title = interaction.options.getString('title');

        // Parse duration
        const giveawayDuration = ms(duration);
        if (!giveawayDuration) {
            return interaction.reply({ content: 'Invalid duration format!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${title}`)
            .setDescription(`Prize: ${prize}\nNumber of Winners: ${winners}`)
            .setFooter({ text: `Ends in ${ms(giveawayDuration, { long: true })}` })
            .setTimestamp();

        const button = new ButtonBuilder()
            .setCustomId('enter_giveaway')
            .setLabel('Enter Giveaway')
            .setStyle(ButtonStyle.Primary);

        const actionRow = new ActionRowBuilder()
            .addComponents(button);

        await interaction.reply({ content: 'Starting giveaway...', ephemeral: true });

        // Send giveaway embed to the current channel
        const giveawayMessage = await interaction.channel.send({ embeds: [embed], components: [actionRow] });

        // Set a timeout to end the giveaway
        setTimeout(async () => {
            const message = await interaction.channel.messages.fetch(giveawayMessage.id);
            const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: giveawayDuration });

            collector.on('collect', i => {
                // Handle the entry
                // For example, add the user ID to a list or a database
            });

            collector.on('end', collected => {
                const winner = collected.size > 0 ? collected.random().user : 'No one';

                const endEmbed = new EmbedBuilder()
                    .setTitle('🎉 Giveaway Ended! 🎉')
                    .setDescription(`Prize: ${prize}\nWinner(s): ${winner}`)
                    .setFooter({ text: 'Thanks for participating!' });

                message.edit({ embeds: [endEmbed], components: [] });
            });

        }, giveawayDuration);
    },
};
