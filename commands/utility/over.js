const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Purge non-pinned messages between start and end times, excluding the first 2 messages.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('start-time')
                .setDescription('Start time (HH:MM)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('end-time')
                .setDescription('End time (HH:MM)')
                .setRequired(true)),
    async execute(interaction) {
        console.log('Command execution started.');

        const startTime = interaction.options.getString('start-time');
        const endTime = interaction.options.getString('end-time');

        // Check if the time format is valid (HH:MM)
        if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
            return interaction.reply({ content: 'Invalid time format. Please use HH:MM.', ephemeral: true });
        }

        const now = new Date();
        const start = new Date(now);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);

        const end = new Date(now);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        end.setHours(endHours, endMinutes, 0, 0);

        // Log times for debugging
        console.log(`Start Time: ${start}, End Time: ${end}`);

        // Check if the start time is after the end time and adjust if necessary
        if (start > end) {
            end.setDate(end.getDate() + 1); // Adjust end time if it's past midnight
        }

        try {
            console.log('Sending initial response.');
            await interaction.reply({ content: 'Processing your request...', ephemeral: true });

            console.log('Fetching messages.');
            const messages = await interaction.channel.messages.fetch({ limit: 100 });
            const sortedMessages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

            const messagesToDelete = sortedMessages.filter((msg, index) => {
                const msgDate = new Date(msg.createdTimestamp);
                return index >= 2 && msgDate >= start && msgDate <= end && !msg.pinned;
            });

            console.log(`Found ${messagesToDelete.size} non-pinned messages to delete.`);
            for (const msg of messagesToDelete.values()) {
                try {
                    await msg.delete();
                    console.log(`Deleted message: ${msg.id}`);
                } catch (deleteError) {
                    console.error('Error deleting message:', deleteError);
                }
            }

            const embed = new EmbedBuilder()
                .setTitle('Session Over')
                .setDescription(`Thank you for joining the Ruralville session. We hope you enjoyed it!

                **__Session Details:__**
                Host: **<@${interaction.user.id}>**
                Start Time: **${startTime}**
                End Time: **${endTime}**`)
                .setImage("https://cdn.discordapp.com/attachments/1282347649055592540/1284416549091934249/Screenshot_2024-09-14_014413.png?ex=66e68da0&is=66e53c20&hm=e6152d448d9965a2868743cd3e82ff6a2028d6547f5b762b48082e94fbc8eafd&")
                .setColor('#f6f5f5')
                .setFooter({
                    text: 'Ruralville',
                    iconURL: 'https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512'
                });

            console.log('Sending session end embed.');
            await interaction.channel.send({ embeds: [embed] });

            // Edit the initial response to indicate completion
            console.log('Editing reply to indicate success.');
            await interaction.editReply({ content: 'Command processed successfully.', ephemeral: true });
        } catch (error) {
            console.error('Error handling command:', error);
            try {
                if (!interaction.replied) {
                    await interaction.reply({ content: 'Failed to process the command. Please try again later.', ephemeral: true });
                } else {
                    await interaction.followUp({ content: 'Failed to process the command. Please try again later.', ephemeral: true });
                }
            } catch (replyError) {
                console.error('Error sending error reply:', replyError);
            }
        }
    },
};
