#!/bin/sh
# https://github.com/chibat/deno-wrapper
# Copyright (c) 2023 Tomofumi Chiba
# MIT License
set -e

version=${templateOption:version}
export DENO_INSTALL=.deno
if [ ! -d "$DENO_INSTALL" ]; then
  # https://deno.com/manual/getting_started/installation
  curl -fsSL https://deno.land/x/install/install.sh | sh -s "$version" >/dev/null
fi
exec "$DENO_INSTALL/bin/deno" "$@"
