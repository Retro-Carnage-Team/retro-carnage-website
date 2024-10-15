#!/usr/bin/bash

mkdocs build -f config/de/mkdocs.yml
mkdocs build -f config/en/mkdocs.yml
cp index.html ./generated/
