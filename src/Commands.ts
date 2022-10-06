import { Command } from "./Command";
import { Set } from "./commands/Set";
import { Current } from "./commands/Current";
import { Feed } from "./commands/Feed";
import { Skip } from "./commands/Skip";
import { Report } from "./commands/Report";

export const Commands: Command[] = [Set, Current, Feed, Skip, Report];
