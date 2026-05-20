#!/usr/bin/env bash
# Batch-convert all roles_2/*.{jpg,png} to .webp at 1920w q82.
# Normalize filenames to kebab-case (lowercase, dashes, no spaces).
# Originals are moved to _archive/roles_2_raw/ after successful conversion.
set -euo pipefail

SRC="/Volumes/Development/react-fyagnb9r/public/photos/roles_2"
ARCHIVE="/Volumes/Development/react-fyagnb9r/_archive/roles_2_raw"

mkdir -p "$ARCHIVE"

normalize() {
  # e.g. "HSN - FB - PIZZA.jpg" -> "hsn-fb-pizza"
  local stem="${1%.*}"
  echo "$stem" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[[:space:]]*-[[:space:]]*/-/g; s/[[:space:]]+/-/g; s/[^a-z0-9-]+//g; s/-+/-/g'
}

count=0
failed=0
shopt -s nullglob nocaseglob
for f in "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png; do
  [ -e "$f" ] || continue
  base="$(basename "$f")"
  stem="$(normalize "$base")"
  out="$SRC/$stem.webp"
  if [ -f "$out" ]; then
    echo "skip (exists): $base"
    mv "$f" "$ARCHIVE/" || true
    continue
  fi
  echo "convert: $base -> $stem.webp"
  if cwebp -quiet -q 82 -resize 1920 0 "$f" -o "$out"; then
    count=$((count + 1))
    mv "$f" "$ARCHIVE/" || true
  else
    echo "FAILED: $base" >&2
    failed=$((failed + 1))
  fi
done

# Move .DS_Store and any leftover non-image files out too
mv "$SRC"/.DS_Store "$ARCHIVE/" 2>/dev/null || true

echo "---"
echo "converted: $count"
echo "failed:    $failed"
echo "archive:   $ARCHIVE"
