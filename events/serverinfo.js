const { Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

// Ensure the 'transcripts' directory exists
const transcriptDir = './transcripts';
if (!fs.existsSync(transcriptDir)) {
    fs.mkdirSync(transcriptDir, { recursive: true });
}

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
    let embedResponses = [];
    let components = [];

    switch (interaction.values[0]) {
        case 'ess':
            const essEmbed = new EmbedBuilder()
                .setDescription('*Coming soon*')
                .setColor(0xf3eeee);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [essEmbed],
                    ephemeral: true
                });
            }
            break;

        case 'sguild':
            const sguildEmbed = new EmbedBuilder()
                .setDescription(`
1. Exercise Common Sense: Always use good judgment during sessions.
2. Yield to Public Services: This includes all staff members.
3. Obey Traffic Signals: Running red lights or stop signs is considered reckless driving and will result in an infraction.
4. Respawn Permissions: Request permission from a staff member before spawning a new vehicle. You can respawn at Spawn or any gas station.
5. Restricted Vehicles: Driving banned vehicles will result in an infraction. A list of banned vehicles will be provided soon.
6. No Combat Logging: Logging out during combat will lead to an unappealable ban.
7. No Drifting or Burnouts: These actions are prohibited and will result in a warning.
8. Realistic Avatars: Wear a realistic avatar during sessions. Non-compliance will result in a warning. (Korblox & Headless are allowed)
9. Respawn Requests: Use "!staff + location" in chat when requesting respawn permissions. Refer to rule 4.
10. Move Over Law: Follow this law when approaching traffic stops or crashes.
11. Accident Protocol: Pull over, exit your vehicle, and type "exchanges" if you get into an accident.
12. Roleplay Crashes: Roleplay all crashes if you're driving over 30 mph and law enforcement or EMS is online.
13. No Horn or High-Beam Abuse: Misuse of horns or high-beams will result in a warning.
14. Public Services Department: You may not be part of any Public Services Department during sessions. Violations will result in a double warning.
15. Safe Merging: Maintain a 5+ car distance when merging lanes. Failure to do so will result in a warning.
16. Realistic Vehicle Colors: Avoid unrealistic vehicle colors, including neon, shiny, or lime. This also applies to your vehicle's rims.
17. No Off-Roading or Reckless Driving: Off-roading, cutting up, or turning at high speeds are prohibited. Using the P-Brake to stop your vehicle is also not allowed.`)
                .setColor(0xf3eeee);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [sguildEmbed],
                    ephemeral: true
                });
            }
            break;

        case 'sping':
            const sessionPingEmbed = new EmbedBuilder()
                .setTitle('Session Ping')
                .setDescription('Press the button below to receive the <@&1282333853360459908> role.')
                .setColor(0xf3eeee);

            const pingButton = new ButtonBuilder()
                .setCustomId('toggle_ping')
                .setLabel('Session Ping')
                .setStyle(ButtonStyle.Primary);

            components.push(new ActionRowBuilder().addComponents(pingButton));
            embedResponses.push(sessionPingEmbed);

            if (embedResponses.length > 0 && !interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: embedResponses,
                    components: components,
                    ephemeral: true
                });
            }
            break;
    }
}

async function handleButtonInteraction(interaction) {
    if (interaction.customId === 'toggle_ping') {
        const roleId1 = '1282333853360459908';
        const member = interaction.member;

        if (member.roles.cache.has(roleId1)) {
            await member.roles.remove(roleId1);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'The <@&1282333853360459908> role has been removed from you.',
                    ephemeral: true
                });
            }
        } else {
            await member.roles.add(roleId1);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'You have been granted the <@&1282333853360459908> role.',
                    ephemeral: true
                });
            }
        }
    }
}
