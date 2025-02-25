#!/bin/bash

if [[ ! -f $1 && ! -d $1 ]]; then
echo
echo "$1 no exist."
echo
exit 0
fi


#
dirname=$(basename $1 .tgz)
rm latest
ln -s $dirname latest

echo
echo "rollback $1 => latest"
echo
