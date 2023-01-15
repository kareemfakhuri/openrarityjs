# openrarityjs
A NodeJS wrapper for OpenRarity (v0.7.1).

# Project Build & Setup Requirements

This project was built against NodeJS 16.11.0.

The following technologies are required:
- Python ≥ 3.10, < 3.12
- Poetry

# Usage
```JavaScript
import { scoreCollection } from "openrarityjs";

const scores = scoreCollection([
  {
    tokenID: "0",
    traits: [
      { type: "Job", value: "Homeless" },
      { type: "Accessory", value: "Coffee Cup" },
    ],
  },
  {
    tokenID: "1",
    traits: [
      { type: "Job", value: "Developer" },
      { type: "Accessory", value: "Keyboard" },
    ],
  },
  {
    tokenID: "2",
    traits: [
      { type: "Job", value: "Barista" },
      { type: "Accessory", value: "Coffee Cup" },
    ],
  },
])

console.log(JSON.stringify(scores, null, 2));
```
Output:
```
[
  {
    "tokenID": "1",
    "rank": 1,
    "score": 1.2663195633487891
  },
  {
    "tokenID": "0",
    "rank": 2,
    "score": 0.8668402183256056
  },
  {
    "tokenID": "2",
    "rank": 2,
    "score": 0.8668402183256056
  }
]
```
