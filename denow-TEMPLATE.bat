@echo off
:: https://github.com/chibat/deno-wrapper
:: Copyright (c) 2023 Tomofumi Chiba
:: MIT License

set "version=${templateOption:version}"
set "DENO_INSTALL=.deno"
if not exist "%DENO_INSTALL%" (
  :: https://deno.com/manual/getting_started/installation
  :: TODO: Make this silent
  powershell -Command "$v='%version%'; irm https://deno.land/install.ps1 | iex"
)
"%DENO_INSTALL%\bin\deno" %*
