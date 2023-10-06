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
    - uses: actions/checkout@v4
    - name: Update data
      uses: francois2metz/dependency-drift-tracker-action@main
      with:
        command: update-data
```

Update the website:

```yml
name: Update website

on:
  push:
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate-website:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Generate website
      uses: francois2metz/dependency-drift-tracker-action@main
      with:
        command: generate-website
```
