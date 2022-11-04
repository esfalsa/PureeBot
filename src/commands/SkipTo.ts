import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import { getAt, getConfig, getNext } from "../State";

export const SkipTo: Command = {
  name: "skipto",
  description: "Go to the first target after the specified time during update",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: "progress",
      description: "The number of seconds into update to skip to.",
      required: true,
    },
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const { update, switchLength } = getConfig();

    if (update == null || switchLength == null) {
      await interaction.followUp({ content: "No settings set." });
      return;
    }

    const progress = interaction.options.get("progress")?.value as number;

    const region = getAt(progress);

    if (region == null) {
      await interaction.followUp({
        content:
          "No more regions found! Use **/report** to list detagged regions.",
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(region.Region)
      .setURL(region.Link)
      .setFields([
        {
          name: "Issues",
          value: region.Issues,
        },
        {
          name: "Link",
          value: region.Link,
        },
      ]);

    await interaction.followUp({ embeds: [embed] });
  },
};
