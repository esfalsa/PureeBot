import {
  ApplicationCommandType,
  Client,
  Collection,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";

import { Command } from "./Command";
import { Set } from "./commands/Set";
import { Current } from "./commands/Current";
import { Feed } from "./commands/Feed";
import { Skip } from "./commands/Skip";
import { Report } from "./commands/Report";

const Commands: Collection<string, Command> = new Collection([
  ["set", Set],
  ["config", { ...Set, name: "config" }],
  ["current", Current],
  ["feed", Feed],
  ["skip", Skip],
  ["report", Report],
]);

Commands.set("help", {
  name: "help",
  description: "Lists PuréeBot commands",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder().setTitle("PuréeBot Help").setFields(
      Commands.map((command) => ({
        name: `/${command.name}`,
        value: command.description,
      }))
    );

    await interaction.followUp({ embeds: [embed] });
  },
});

export { Commands };
