#!/bin/bash

LCD="./site"
RCD="/"

lftp -f "
open ${{env.$FTP_HOST}}
user ${{secrets.FTP_USER}} ${{secrets.FTP_PASS}}
mirror --continue --reverse --verbose $LCD $RCD
bye
" 