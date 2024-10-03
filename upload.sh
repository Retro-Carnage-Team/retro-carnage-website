#!/usr/bin/bash

FTP_HOST=$1
FTP_USER=$2
FTP_PASS=$3
LCD="./site"
RCD="/"

lftp -f "
open $FTP_HOST
user $FTP_USER $FTP_PASS
mirror --continue --reverse --verbose $LCD $RCD
bye
" 