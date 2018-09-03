#!/bin/bash

basePath=$(cd `dirname $0`; pwd)
defaultConfig="${basePath}/../server/config/default.config.js"
customConfig="${basePath}/../custom.server.config.js"

if [ -e "$customConfig" ]; then
  echo "[info] Server configuration file exists."
else
  cp -n $defaultConfig $customConfig
  echo "[info] Create a server config file. Done."
fi
