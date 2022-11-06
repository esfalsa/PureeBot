import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { createRegionResponse } from "../utils";
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

    await interaction.followUp(createRegionResponse(region));
  },
};
