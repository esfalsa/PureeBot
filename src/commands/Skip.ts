import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { sendRegionMessage } from "../utils";
import { Command } from "../Command";
import { getNext } from "../State";

export const Skip: Command = {
  name: "skip",
  description:
    "Gets the next target without marking the previous one as detagged",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    interaction.deleteReply();

    const region = getNext();

    if (!region || !interaction.channel) {
      return;
    }

    sendRegionMessage(region, interaction.channel);
  },
};
