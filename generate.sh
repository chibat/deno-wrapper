#!/bin/sh

if [ -e ./denow ]
then
  echo 'denow already exists.'
  exit 1
fi

if [ $# -eq 0 ]; then
  version=$(
    curl -sSf https://github.com/denoland/deno/releases |
      grep -o "/denoland/deno/releases/download/.*/deno-" |
      head -n 1 |
      sed 's/\/deno-$//' |
      sed 's/^\/denoland\/deno\/releases\/download\///'
  )
  if [ ! "$version" ]; then
    echo "Error: Unable to find latest Deno release on GitHub." 1>&2
    exit 2
  fi
else
  version="${1}"
fi

cat << 'EOT' | sed "s/__VERSION__/$version/" > ./denow
#!/bin/sh

VERSION=__VERSION__

DENOW_INSTALL=~/.denow
DENO=$DENOW_INSTALL/bin/deno-$VERSION

set -e

if [ ! -e $DENO ]
then
  curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=$DENOW_INSTALL sh -s $VERSION
  mv $DENOW_INSTALL/bin/deno $DENO
fi

$DENO $@

EOT

chmod u+x ./denow
./denow --version

echo "'denow' was generated."

