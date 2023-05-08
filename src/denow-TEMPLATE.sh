#!/bin/sh
# https://github.com/chibat/deno-wrapper
# Copyright (c) 2023 Tomofumi Chiba
# MIT License
set -e

# https://manpages.ubuntu.com/manpages/kinetic/en/man1/chronic.1.html
chronicsh() (
  set +e
  output=$("$SHELL" -ec "$1" 2>&1)
  exit_code=$?
  set -e
  if [ "$exit_code" -ne 0 ]; then
    echo "$output"
  fi
  return "$exit_code"
)

chronicsh '
  if [ ! -d .deno ]; then
      # https://deno.com/manual/getting_started/installation
      export DENO_INSTALL=.deno
      curl -fsSL https://deno.land/x/install/install.sh | sh -s "${templateOption:version}"
  fi
'

exec .deno/bin/deno "$@"
