# Deno wrapper

🐘 Like `./gradlew`, but for [Deno]

<div align="center">

<!-- TODO: Replace picture with something better -->

![](https://user-images.githubusercontent.com/61068799/238832067-0b3bcb1f-e52e-4fdf-b037-c8001f6e00c2.png)

</div>

🦕 Downloads a pinned version of Deno \
📂 Caches Deno installation in the `.deno` folder \
🌟 Works best when placed at the root of your project as `./denow` \
👤 Users don't need to install `deno` globally

## Installation

![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)

Find your existing Deno project, then run:

```sh
deno run -A https://cdn.jsdelivr.net/gh/chibat/deno-wrapper/cli.ts
```

You can add a `vN.N.N` argument to download a specific version. By default we
use the `Deno.version.deno` version.

```sh
deno run -A https://cdn.jsdelivr.net/gh/chibat/deno-wrapper/cli.ts 1.30.0
```

This CLI will create the wrapper scripts as `./denow` for POSIX and
`./denow.bat` for Windows.

You can also use `deno install` to install `deno-wrapper` globally. Then, you
can just use the `deno-wrapper` CLI in whatever project you want.

```sh
deno install -A https://cdn.jsdelivr.net/gh/chibat/deno-wrapper/cli.ts
deno-wrapper 1.30.0
```

## Usage

![Terminal](https://img.shields.io/static/v1?style=for-the-badge&message=Terminal&color=4D4D4D&logo=Windows+Terminal&logoColor=FFFFFF&label=)
![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D6&logo=Windows&logoColor=FFFFFF&label=)
![Linux](https://img.shields.io/static/v1?style=for-the-badge&message=Linux&color=222222&logo=Linux&logoColor=FCC624&label=)
![macOS](https://img.shields.io/static/v1?style=for-the-badge&message=macOS&color=000000&logo=macOS&logoColor=FFFFFF&label=)

Just use `./denow` as though it were the true `deno` binary! Anyone who clones
your repo won't need to install deno themselves; the `./denow` will auto-install
a local copy into the `.deno` folder.

⚠️ Make sure you add `.deno` to your `.gitignore`! That's where the
`DENO_INSTALL` is set.

```sh
./denow --help
./denow eval 'console.log(42)'
./denow fmt
./denow task mytask
./denow compile --allow-read --allow-net https://deno.land/std/http/file_server.ts
./denow run --allow-net https://examples.deno.land/http-server.ts
./denow run -A src/index.ts
```

If you want to update the version of Deno that `./denow` downloads and invokes,
you can go through the install steps (above) again to pin to a different
version. Be aware that this will overwrite the `./denow` and `./denow.bat`
files. You can also inspect the generated `./deno` and `./deno.bat` files to see
what version of Deno they are invoking and change it manually.

### Why?

Sometimes (not often, but sometimes), you want to have an auto-install wrapper
around a project-critical binary. In a nutshell you gain the following benefits:

- Standardizes a project on a given Deno version, leading to more reliable and
  robust builds.

- Provisioning a new Deno version to different users and execution environment
  (e.g. IDEs or Continuous Integration servers) is as simple as changing the
  Wrapper definition.

For instance, GitHub Actions can be written using Deno, but how do you make sure
`deno` is available on the GitHub Action runner? You can use `./denow` (or
`./denow.bat`) as a proxy!

### Why not just download the `deno` binary as `./deno`?

Because the Deno binary is >100MB, which is more than most version control
systems want to deal with. [GitHub will even block files larger than 100MB]!

## Development

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![sh](https://img.shields.io/static/v1?style=for-the-badge&message=sh&color=4EAA25&logo=GNU+Bash&logoColor=FFFFFF&label=)

The main `denow` script is written in POSIX shell code. That means things like
`if [[ $hello == world ]]` are off the table. Only POSIX-compatible things are
allowed. The `cli.ts` file is the `deno-wrapper` CLI script that replaces the
`{{version}}` CookieCutter-like variable in `deno` with the actual version that
the user wants (when they run the `deno-wrapper` CLI they pin the version). We
use GitHub Actions to test the `denow` script (and the `denow.bat` script) on
Ubuntu, macOS, and Windows.

<!-- prettier-ignore-start -->
[Deno]: https://deno.com/runtime
[github will even block files larger than 100mb]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
<!-- prettier-ignore-end -->
