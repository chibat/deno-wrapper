#!/usr/bin/env deno run -A
import { writeFile, readFile, chmod } from "node:fs/promises";
import { parse as parseArgs } from "https://deno.land/std/flags/mod.ts";
import { dedent } from "npm:ts-dedent";

const args = parseArgs(Deno.args);

if (args.version || args.v) {
  console.info("deno-wrapper v1.0.0");
  Deno.exit(0);
}

if (args.help || args.h) {
  console.info(
    dedent(`
      deno-wrapper v1.0.0

      Use this script to create a Deno auto-installer wrapper for your project,
      similar to ./gradlew for Gradle-based projects.

      USAGE:

        deno run -A https://deno.land/x/deno-wrapper [version]

      EXAMPLE:

        deno eval 'console.log(Deno.version.deno)'
        #=> ${Deno.version.deno}
        deno run -A https://deno.land/x/deno-wrapper v1.30.0
        ./denow eval 'console.log(Deno.version.deno)'
        #=> 1.30.0
    `)
  );
  Deno.exit(0);
}

const version = args._[0] || "v" + Deno.version.deno;
console.info(`🟦 Pinning Deno ${version} for ./denow scripts`);

{
  console.debug("🟪 Fetching denow-TEMPLATE.sh...");
  const response = await fetch(import.meta.resolve("./denow-TEMPLATE.sh"));
  let text = await response.text();

  console.debug("🟪 Replacing template variables...");
  text = text.replaceAll("${templateOption:version}", version);

  console.debug("🟪 Writing ./denow...");
  await writeFile("denow", text);
  // This is equivalent to chmod +x in most cases.
  await chmod("denow", 0o755);
}
console.info("🟩 Created ./denow script");

{
  console.debug("🟪 Fetching denow-TEMPLATE.bat...");
  const response = await fetch(import.meta.resolve("./denow-TEMPLATE.bat"));
  let text = await response.text();

  console.debug("🟪 Replacing template variables...");
  text = text.replaceAll("${templateOption:version}", version);

  console.debug("🟪 Writing ./denow.bat...");
  await writeFile("denow.bat", text);
}
console.info("🟩 Created ./denow.bat script");

console.info("🟨 Make sure to add '.deno' to your .gitignore!");
