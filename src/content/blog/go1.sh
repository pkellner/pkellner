#!/bin/bash

find . -type f -exec sh -c '
  for file; do
    awk "/^excerpt:/ && !modif { sub(/^excerpt:/, \"description:\"); modif=1 } {print}" "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  done
' sh {} +
