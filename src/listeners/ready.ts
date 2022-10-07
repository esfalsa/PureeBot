import { Client } from "discord.js";
import { Commands } from "../Commands";
import { setRegions } from "../State";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    const response = await fetch(
      "https://esfalsa.github.io/puree/data/detags.json"
    );
    setRegions(await response.json());

    await client.application.commands.set([...Commands.values()]);

    console.log(`${client.user.username} is online.`);
  });
};
