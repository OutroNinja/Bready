# Paginate(interaction, [pages], style, {options})

Create a page system in an easy, fast and efficient way.

- `interaction` `<Object>` Command interaction object
- `pages` `<Object>` Object containing your embeds
- `style` `<Sring>` Your pagination style (Only available PaginationStyle.Button)
- `options`
    - `time` `<Number>`: Time in milliseconds in which the system must be active. `Default value: 30000`
    - `cooldown` `<Number>`: Cooldown to be able to go to another page. `Default value: 3`
    - `emojis` `<Object>`: List of button emojis. `Default value: ["⬅️", "🏠", "➡️"]`
    - `notAllowed` `<String>`: Error message if the user cannot interact with the buttons. `Default value: You are not allowed to do this!`
    - `onCooldown` `<Function>`: Error messages if the user is still on cooldown. `Default value: (remaining) => "You are on cooldown. Please wait ${remaining} seconds before interacting again."` (In this case using (`) instead of ("))

## Example:
```js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Paginate, PaginationStyle } = require("@bready/discord");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows help menu'),
	async execute(interaction) {
        const embeds = [];
        for (let i = 0; i < 4; i++) {
            embeds.push(new EmbedBuilder().setDescription(`Page ${i + 1}`));
        }

        await Paginate(interaction, embeds, PaginateStyle.Button, { emojis: ["🫲", "🖐️", "🫱"], cooldown: 5 })
	},
};
```

### Result:
<p align="center">
<img width="100%" src="github.com/OutroNinja/Bready/tree/main/packages/discord/docs/result.png">
</p>
