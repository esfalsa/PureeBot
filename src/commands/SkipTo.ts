import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
  ApplicationCommandOptionType,
} from "discord.js";
import { createRegionResponse } from "../utils";
import { Command } from "../Command";
import { getAt, getConfig } from "../State";

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

    await interaction.followUp(createRegionResponse(region));
  },
};
