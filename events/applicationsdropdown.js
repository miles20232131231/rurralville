const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            // Handle Select Menu Interactions
            if (interaction.isStringSelectMenu() && interaction.customId === 'information_select') {
                await handleStringSelectMenu(interaction);
            }
            // Handle Button Interactions
            else if (interaction.isButton()) {
                await handleButtonInteraction(interaction);
            }
        } catch (error) {
            console.error(`Error handling interaction: ${error}`);
            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({ content: 'An error occurred while handling your request.', ephemeral: true });
                } catch (replyError) {
                    console.error(`Failed to send error reply: ${replyError}`);
                }
            }
        }
    },
};

async function handleStringSelectMenu(interaction) {
    let responseEmbed;

    switch (interaction.values[0]) {
        case 'sa':
            responseEmbed = new EmbedBuilder()
                .setDescription('*https://forms.gle/fZnFUWrEN29JZWK58*')
                .setColor(0xf3eeee);
            break;

        case 'wsp':
            responseEmbed = new EmbedBuilder()
                .setDescription('*https://forms.gle/tBd2VeuDnMJ7Cq4E7*')
                .setColor(0xf3eeee);
            break;

        case 'ocso':
            responseEmbed = new EmbedBuilder()
                .setDescription('*https://forms.gle/tBd2VeuDnMJ7Cq4E7*')
                .setColor(0xf3eeee);
            break;

        case 'dot':
            responseEmbed = new EmbedBuilder()
                .setDescription('*https://forms.gle/tBd2VeuDnMJ7Cq4E7*')
                .setColor(0xf3eeee);
            break;

        default:
            responseEmbed = new EmbedBuilder()
                .setDescription('Invalid selection.')
                .setColor(0xf3eeee);
            break;
    }

    // Send a new ephemeral embed in response to the dropdown selection
    await interaction.reply({
        embeds: [responseEmbed],
        ephemeral: true
    });
}

async function handleButtonInteraction(interaction) {
    if (interaction.customId === 'toggle_ping') {
        const roleId1 = '1282333853360459908';
        const member = interaction.member;

        if (member.roles.cache.has(roleId1)) {
            await member.roles.remove(roleId1);
            await interaction.reply({
                content: 'The <@&1282333853360459908> role has been removed from you.',
                ephemeral: true
            });
        } else {
            await member.roles.add(roleId1);
            await interaction.reply({
                content: 'You have been granted the <@&1282333853360459908> role.',
                ephemeral: true
            });
        }
    }
}
