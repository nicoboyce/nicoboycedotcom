#!/bin/bash
# Convert mug PNG files to SVG by tracing as bitmap

cd /Users/nico/nicoboycedotcom/nicoboycedotcom/mug

for png in *.png; do
    base="${png%.png}"
    echo "Processing $png..."

    # Flip horizontally, convert to grayscale, threshold to black & white bitmap
    magick "$png" -flop -colorspace Gray -threshold 50% "${base}-bitmap.pbm"

    # Trace with potrace
    potrace "${base}-bitmap.pbm" -s -o "../public/svg/mug-${base}.svg"

    # Clean up temp files
    rm -f "${base}-bitmap.pbm"

    echo "Created ../public/svg/mug-${base}.svg"
done

echo "All files converted and reversed!"
