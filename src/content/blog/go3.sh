#!/bin/bash

# Define the search and replace patterns
SEARCH_PATTERN="author: Peter Kellner"
REPLACE_PATTERN="author:\n  display_name: Peter Kellner\n  login: Peter Kellner\n  email: peter@peterkellner.net\n  url: 'https://peterkellner.net'\nauthor_login: admin\n"

# Find all markdown files and process them
find . -type f -name "*.md" | while read filename; do
  # Check if file contains the search pattern
  grep -q "$SEARCH_PATTERN" "$filename" && \
  # Use sed to replace the pattern inline and add a line feed at the end
  sed -i '' "s|$SEARCH_PATTERN|$REPLACE_PATTERN|" "$filename"
done

echo "Replacement process completed."
