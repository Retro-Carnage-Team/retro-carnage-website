#!/usr/bin/bash

mkdocs build -v -s -f config/de/mkdocs.yml
mkdocs build -v -s -f config/en/mkdocs.yml
cp index.html ./generated/
