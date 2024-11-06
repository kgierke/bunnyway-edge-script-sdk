#!/bin/bash

repo_base=$(git rev-parse --show-toplevel)
cd "$repo_base"

echo "Creating doc for bunny-sdk"
cd libs/bunny-sdk/
npx typedoc --json ../../docs-json/sdk-$(cat package.json | jq -r '.version').json --options typedoc.json --validation.invalidLink false --name $(cat package.json | jq -r '.name')/$(cat package.json | jq -r '.version') --includeVersion true

cd "$repo_base"
npx typedoc --entryPointStrategy merge "docs-json/*.json"
