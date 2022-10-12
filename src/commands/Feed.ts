import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { Command } from "../Command";
import { getConfig, getNext } from "../State";

export const Feed: Command = {
  name: "feed",
  description: "Gets the next target and marks the previous one as detagged",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const { update, switchLength } = getConfig();

    if (update == null || switchLength == null) {
      await interaction.followUp({ content: "No settings set." });
      return;
    }

    const region = getNext(true);

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

    const actions = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Open")
        .setStyle(ButtonStyle.Link)
        .setURL(region.Link)
    );

    await interaction.followUp({ embeds: [embed], components: [actions] });
  },
};
