#!/bin/bash

FTP_HOST=${{env.FTP_HOST}}
LCD="./site"
RCD="/"

echo $FTP_HOST

lftp -f "
open $FTP_HOST
user ${{secrets.FTP_USER}} ${{secrets.FTP_PASS}}
mirror --continue --reverse --verbose $LCD $RCD
bye
" 