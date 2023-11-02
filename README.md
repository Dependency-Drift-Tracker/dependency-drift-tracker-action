# Dependency drift tracker GitHub Action

Use [dependency-drift-tracker][] with GitHub action. Schedule the update every day and track your dependencies drift and use GitHub Page to display a webpage.

### Usage

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
      uses: Dependency-Drift-Tracker/dependency-drift-tracker-action@v1
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
      uses: Dependency-Drift-Tracker/dependency-drift-tracker-action@v1
      with:
        command: generate-website
```

## License

GNU GPL 3

[dependency-drift-tracker]: https://github.com/Dependency-Drift-Tracker/dependency-drift-tracker
