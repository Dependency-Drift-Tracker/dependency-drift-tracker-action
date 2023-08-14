# Dependency drift tracker GitHub Action

Example usage:

```yml
name: Update libyear info

on:
  schedule:
    - cron:  '0 7 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Update data
      uses: francois2metz/dependency-drift-tracker-action@main
```
