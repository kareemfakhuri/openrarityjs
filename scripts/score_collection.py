import sys
import json

from open_rarity import (
    Collection,
    Token,
    RarityRanker,
    TokenMetadata
)
from open_rarity.models.token_metadata import (
    StringAttribute,
)
from open_rarity.models.token_identifier import EVMContractTokenIdentifier
from open_rarity.models.token_standard import TokenStandard

# I==== Script logic starts here ====I

# Load and parse metadata
dump = open(sys.argv[1], "r").read()
metadata = json.loads(dump)

# Build OpenRarity collection object
tokens = []

for token in metadata:
    string_attributes = dict()
    for trait in token["traits"]:
        string_attributes[trait["type"]] = StringAttribute(name=trait["type"], value=trait["value"])
    
    tokens.append(Token(
            token_identifier=EVMContractTokenIdentifier(
                contract_address="", token_id=token["tokenID"]
            ),
            token_standard=TokenStandard.ERC721,
            metadata=TokenMetadata(
                string_attributes=string_attributes,
            ),
        ),)

collection = Collection(
    name="",
    tokens=tokens
)

tokens = []

# Iterate through ranked tokens & build JSON
for token_rarity in RarityRanker.rank_collection(collection=collection):
    token = dict()

    token["tokenID"] = token_rarity.token.token_identifier.token_id
    token["rank"] = token_rarity.rank
    token["score"] = token_rarity.score

    tokens.append(token)

# Stringify and dump results
dump = open(sys.argv[2], "w")
dump.write(json.dumps(tokens))