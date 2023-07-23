# Presentationware - README

Presentationware is a console-based presentation tool that allows you to create interactive presentations in the terminal. It provides a unique way to present information, making your presentations more engaging and memorable.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Presentation Content](#presentation-content)
- [Command-Line Options](#command-line-options)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive console-based presentation with a terminal-like interface.
- Display ASCII art titles for each section to make the presentation more appealing.
- Navigate through sections using numeric or alphanumeric inputs.
- Supports nested sub-bullets for a structured presentation.
- Customizable presentation content using a JSON file.

## Requirements

- Node.js (Version 12 or higher)

## Installation

1. Ensure you have Node.js installed on your system.
2. Download or clone the presentationware repository from GitHub.
3. Navigate to the presentationware directory in your terminal.
4. Install the required dependencies by running the following command:

```npm i```

## Usage

To launch the presentationware, use the following command:

```node present.js [filename]```

- `filename` (optional): Specify the name of the JSON file containing your presentation content. If not provided, the default `presentation.json` will be used.

## Presentation Content

Create a JSON file to define the content of your presentation. The JSON file should have the following structure:

```json
[
  {
    "id": "1",
    "title": "Section 1",
    "content": "Section 1 content goes here.",
    "subBullets": [
      { "id": "1a", "title": "Sub-bullet 1a", "content": "Sub-bullet 1a content." },
      { "id": "1b", "title": "Sub-bullet 1b", "content": "Sub-bullet 1b content." }
    ]
  },
  {
    "id": "2",
    "title": "Section 2",
    "content": "Section 2 content goes here.",
    "subBullets": []
  },
  // Add more sections as needed
]
```

- Each section is defined as an object with \`id\`, \`title\`, and \`content\`.
- For sections with sub-bullets, use the \`subBullets\` property to define them.

## Command-Line Options

- `filename` (optional): Specify the name of the JSON file containing your presentation content. If not provided, the default \`presentation.json\` will be used.

## Examples

1. Launch presentation using the default \`presentation.json\` file:

```bash
node present.js
```

2. Launch presentation using a custom JSON file:

```bash
node present.js my_presentation.json
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create a pull request or submit an issue on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
