@echo off
:: https://github.com/chibat/deno-wrapper
:: Copyright (c) 2023 Tomofumi Chiba
:: MIT License

:: TODO: Make this silent unless there's an error
if not exist .deno (
  :: https://deno.com/manual/getting_started/installation
  set DENO_INSTALL=.deno
  powershell -Command "$v='${templateOption:version}'; irm https://deno.land/install.ps1 | iex"
)

.\bin\deno %*
