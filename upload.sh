#!/bin/bash

LCD="./site"
RCD="/"

lftp -f "
open $FTP_HOST
user $FTP_USER $FTP_PASS
mirror --continue --reverse --verbose $LCD $RCD
bye
" 