#!/bin/bash
# Convert mug PNG files to SVG with proper alpha extraction, then reverse

cd /Users/nico/nicoboycedotcom/nicoboycedotcom/mug

for png in *.png; do
    base="${png%.png}"
    echo "Processing $png..."

    # First flip the image horizontally
    magick "$png" -flop "${base}-flipped.png"

    # Convert flipped to PNM
    magick "${base}-flipped.png" "${base}.pnm"

    # Extract alpha channel from flipped image and negate
    magick "${base}-flipped.png" -alpha extract -negate "${base}-alpha.pnm"

    # Trace the alpha channel with potrace
    potrace "${base}-alpha.pnm" -s -o "../public/svg/mug-${base}.svg"

    # Clean up temp files
    rm -f "${base}.pnm" "${base}-alpha.pnm" "${base}-flipped.png"

    echo "Created ../public/svg/mug-${base}.svg"
done

echo "All files converted and reversed!"
