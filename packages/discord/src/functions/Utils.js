const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

class PaginateStyle {
    static Button = "button";
}

async function Paginate(interaction, pages, style, options = {}) {
    try {
        const {
            time = 30000,
            cooldown = 3,
            emojis = ["⬅️", "🏠", "➡️"],
            notAllowed = "You are not allowed to do this!",
            onCooldown = (remaining) => `You are on cooldown. Please wait ${remaining} seconds before interacting again.`
        } = options;

        if (!interaction || !pages || pages.length === 0 || !style || style !== "button") {
            throw new Error("Missing or invalid arguments");
        }

        if (cooldown < 1) {
            console.warn("Warning: Setting a cooldown less than 0 may lead to unexpected behavior.");
        }

        const cooldowns = new Map();
        const applyCooldown = () => cooldowns.set(interaction.user.id, cooldown);

        await interaction.deferReply();

        if (pages.length === 1) {
            return await interaction.editReply({
                embeds: pages,
                components: [],
                fetchReply: true,
            });
        }

        const [prevEmoji, homeEmoji, nextEmoji] = emojis;

        const prev = new ButtonBuilder()
            .setCustomId("prev")
            .setEmoji(prevEmoji)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const home = new ButtonBuilder()
            .setCustomId("home")
            .setEmoji(homeEmoji)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const next = new ButtonBuilder()
            .setCustomId("next")
            .setEmoji(nextEmoji)
            .setStyle(ButtonStyle.Primary);

        const buttons = new ActionRowBuilder().addComponents([prev, home, next]);
        let index = 0;

        const message = await interaction.editReply({
            embeds: [pages[index]],
            components: [buttons],
            fetchReply: true,
        });

        const messageCollector = await message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time,
        });

        messageCollector.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id) {
                return await i.reply({ content: notAllowed, ephemeral: true });
            }

            const userCooldown = cooldowns.get(interaction.user.id);
            if (userCooldown > 0) {
                return await i.reply({ content: onCooldown(userCooldown), ephemeral: true });
            }

            await i.deferUpdate();
            applyCooldown();

            if (i.customId === "prev") {
                index = index > 0 ? index - 1 : 0;
            } else if (i.customId === "home") {
                index = 0;
            } else if (i.customId === "next") {
                index = index < pages.length - 1 ? index + 1 : pages.length - 1;
            }

            if (index === 0) {
                prev.setDisabled(true);
                home.setDisabled(true);
            } else {
                prev.setDisabled(false);
                home.setDisabled(false);
            }

            if (index === pages.length - 1) {
                next.setDisabled(true);
            } else {
                next.setDisabled(false);
            }

            await message.edit({
                embeds: [pages[index]],
                components: [buttons],
            });

            messageCollector.resetTimer();
        });

        const cooldownTimer = setInterval(() => {
            for (const [userId, remaining] of cooldowns.entries()) {
                if (remaining > 0) {
                    cooldowns.set(userId, remaining - 1);
                } else {
                    cooldowns.delete(userId);
                }
            }
        }, 1000);

        messageCollector.on("end", async () => {
            clearInterval(cooldownTimer);

            await message.edit({
                embeds: [pages[index]],
                components: [],
            });
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { Paginate, PaginateStyle };