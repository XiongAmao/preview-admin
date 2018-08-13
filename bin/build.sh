#!/bin/bash

basepath=$(cd `dirname $0`; cd ..; pwd)

$(cd $basepath/site/admin-vue && npm install && npm run build)

