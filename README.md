# Deno wrapper

🐘 Like `./gradlew`, but for [Deno]

<div align="center">

![](https://picsum.photos/600/400)

</div>

🦕 Downloads a pinned version of Deno \
📂 Caches Deno installation in the `.deno` folder \
🌟 Works best when placed at the root of your project as `./denow`

## Installation

Find your existing Deno project, then run:

```sh
curl -fsSL https://github.com/chibat/deno-wrapper/raw/v1.0.0/denow.sh | sh
```

You can add a `vN.N.N` argument to download a specific version. By default we
use the `Deno.version.deno` version.

```sh
curl -fsSL https://github.com/chibat/deno-wrapper/raw/v1.0.0/denow.sh | sh -s vN.N.N
```

This CLI will create the wrapper scripts as `./denow` for POSIX and
`./denow.bat` for Windows.

## Usage

Just use `./denow` as though it were the true `deno` binary!

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
files.

## FAQ

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

<!-- prettier-ignore-start -->
[Deno]: https://deno.com/runtime
[github will even block files larger than 100mb]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
<!-- prettier-ignore-end -->
