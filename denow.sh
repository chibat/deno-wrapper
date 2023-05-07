#!/bin/sh
version=${2:-v$(deno eval 'console.log(Deno.version.deno)')}
tree_prefix='https://github.com/chibat/deno-wrapper/raw/v1.0.0/'

curl -fsSL "${tree_prefix}denow-TEMPLATE.sh" \
  | sed -i "s/\${templateOption:version}/$version/g" \
  > denow
chmod +x denow

curl -fsSL "${tree_prefix}denow-TEMPLATE.bat" \
  | sed -i "s/\${templateOption:version}/$version/g" \
  > denow.bat
