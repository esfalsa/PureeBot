import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../Command";
import { getConfig, getNext } from "../State";

export const Skip: Command = {
  name: "skip",
  description:
    "Gets the next target without marking the previous one as detagged",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const { update, switchLength } = getConfig();

    if (update == null || switchLength == null) {
      await interaction.followUp({ content: "No settings set." });
      return;
    }

    const region = getNext(false);
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
