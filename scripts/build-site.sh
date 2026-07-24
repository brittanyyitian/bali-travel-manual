#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
build_dir="$project_dir/dist"

rm -rf "$build_dir"
mkdir -p "$build_dir/server" "$build_dir/client"

cp "$project_dir/worker/index.js" "$build_dir/server/index.js"
cp "$project_dir/index.html" "$build_dir/client/index.html"
cp "$project_dir/app.js" "$build_dir/client/app.js"
cp "$project_dir/data.js" "$build_dir/client/data.js"
cp "$project_dir/styles.css" "$build_dir/client/styles.css"
cp -al "$project_dir/assets" "$build_dir/client/assets"
