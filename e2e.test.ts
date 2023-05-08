import $ from "https://deno.land/x/dax/mod.ts";
import { expect } from "https://deno.land/x/expect/mod.ts";

Deno.test("deno-wrapper", async (t) => {
  const tempFolder = await Deno.makeTempDir();
  try {
    Deno.chdir(tempFolder);

    await t.step("deno run -A src/index.ts v1.30.0", async () => {
      const indexTSPath = import.meta.resolve("../src/index.ts");
      await $`deno run -A ${indexTSPath} v1.30.0`;
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    await t.step("file ./denow and ./denow.bat exist", async () => {
      console.log("./denow");
      console.log(await Deno.readTextFile("./denow"));

      console.log("./denow.bat");
      console.log(await Deno.readTextFile("./denow.bat"));
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (Deno.build.os === "windows") {
      await t.step(
        "./denow.bat eval 'console.log(Deno.version.deno)'",
        async () => {
          const output =
            await $`./denow.bat eval 'console.log(Deno.version.deno)'`.text();
          expect(output).toEqual("1.30.0");
        }
      );
    } else {
      await t.step(
        "./denow eval 'console.log(Deno.version.deno)'",
        async () => {
          const output =
            await $`./denow eval 'console.log(Deno.version.deno)'`.text();
          expect(output).toEqual("1.30.0");
        }
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    await t.step("folder .deno exists", async () => {
      const items = [];
      for await (const item of Deno.readDir(".deno")) {
        items.push(item.name);
      }

      console.log(".deno");
      console.log(items);
    });
  } finally {
    await Deno.remove(tempFolder, { recursive: true });
  }
});
