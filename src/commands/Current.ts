import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../Command";
import { getConfig } from "../State";

export const Current: Command = {
  name: "current",
  description: "View your current configuration",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const { update, switchLength, targets } = getConfig();

    if (update == null || switchLength == null) {
      await interaction.followUp({ content: "No settings set." });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("Current Settings")
      .addFields(
        { name: "Update", value: update?.toString() },
        { name: "Switch Length", value: `${switchLength} seconds` },
        { name: "Target", value: targets.length.toString() }
      );

    await interaction.followUp({ embeds: [embed] });
  },
};
