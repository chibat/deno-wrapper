#!/usr/bin/env deno run -A
import { writeFile, chmod } from "node:fs/promises";

const version = Deno.args[2] || "v" + Deno.version.deno;

{
  const response = await fetch("denow-TEMPLATE.sh");
  let text = await response.text();
  text = text.replaceAll("${templateOption:version}", version);
  await writeFile("denow", text);
  await chmod("denow", "+x");
}

{
  const response = await fetch("denow-TEMPLATE.bat");
  let text = await response.text();
  text = text.replaceAll("${templateOption:version}", version);
  await writeFile("denow.bat", text);
}
