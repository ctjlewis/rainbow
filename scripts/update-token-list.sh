### Because the Token List is kept updated in the repo, we can simply save the
### file from Microsoft's servers and skip the build process.

# The URL to the raw file in GitHub's CDN.
TOKEN_LIST_URL=https://raw.githubusercontent.com/ctjlewis/rainbow-token-list/service-compatibility/src/data/rainbow-token-list.json

# Override the JSON in src/references/uniswap.
curl $TOKEN_LIST_URL --output ./src/references/uniswap/rainbow-token-list.json