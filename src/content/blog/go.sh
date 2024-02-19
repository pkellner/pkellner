#!/bin/bash

# Navigate to the directory containing your files
# cd /path/to/your/directory

# Loop through each file in the directory
for file in *; do
  # Check if the file is a regular file (not a directory or a link)
  if [[ -f "$file" ]]; then
    # Use sed to remove the line that starts with 'layout:'
    # -i '' edits files in place without backup
    # '/^layout:/d' deletes lines that start with 'layout:'
    sed -i '' '/^layout:/d' "$file"
  fi
done
