import { Command } from "./Command";
import { Set } from "./commands/Set";
import { Current } from "./commands/Current";
import { Feed } from "./commands/Feed";

export const Commands: Command[] = [Set, Current, Feed];
