#!/bin/bash

# Loop through all Markdown files in the current directory
for file in *.md; do
    # Skip directories
    if [[ -d "$file" ]]; then continue; fi

    # Check if the file already contains 'pubDatetime'
    if grep -q "pubDatetime:" "$file"; then
        echo "Skipping $file, already contains pubDatetime."
        continue # Skip this file
    fi

    # Extract the date from the filename (YYYY-MM-DD)
    filename="$(basename "$file")"
    year="${filename:0:4}"
    month="${filename:5:2}"
    day="${filename:8:2}"

    # Set the time to 1 PM Pacific Time, represented in UTC as 20:00:00.000Z
    pubDatetime="$year-$month-$day""T20:00:00.000Z"

    # Prepare the new line to be added
    new_line="pubDatetime: $pubDatetime"

    # Check if file contains 'published:', then add 'pubDatetime' line after it
    if grep -q "published:" "$file"; then
        # Use sed to insert the new line after the line containing 'published:', including a newline after
        sed -i '' "/published:/a\\
$new_line\\
" "$file"
    else
        echo "No 'published:' line found in $file. Skipping insertion."
    fi
done

echo "Completed adding pubDatetime to files."
