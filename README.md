# webtoapk

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


# Documentation for [`buildAPK.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fikku%2Frnd%2Fwebtoapk%2FbuildAPK.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ikku/rnd/webtoapk/buildAPK.js")

## Overview

The [`buildAPK.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fikku%2Frnd%2Fwebtoapk%2FbuildAPK.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ikku/rnd/webtoapk/buildAPK.js") script is designed to automate the process of building Android APK files from your project's source code. This documentation provides a comprehensive guide on how to use the script, its requirements, and additional information to ensure a smooth APK generation process.

## Requirements

- **Node.js**: Ensure you have Node.js installed on your system to run the script. You can download it from [Node.js official website](https://nodejs.org/).
- **Java Development Kit (JDK)**: The JDK is necessary for Android development. Make sure it's installed and properly set up in your environment variables.
- **Android SDK**: The script requires access to the Android SDK. Ensure it's installed and configured correctly.
- **Environment Variables**: Set up the necessary environment variables for JAVA_HOME and ANDROID_HOME.

## Installation

1. **Clone the Project**: Start by cloning the repository to your local machine.
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the Project Directory**: Change into the project directory.
   ```bash
   cd <project-directory>
   ```
3. **Install Dependencies**: Use npm to install the project's dependencies.
   ```bash
   npm install
   ```

## Usage

To build an APK using the `buildAPK.js` script, follow these steps:

1. **Open Terminal**: Ensure you're in the project's root directory.
2. **Run the Script**: Execute the script using Node.js.
   ```bash
   node buildAPK.js
   ```
3. **Follow On-Screen Instructions**: The script may provide prompts or instructions. Follow them to proceed with the APK building process.

## Configuration

The script uses the `apkDestination` variable to determine where the generated APK file will be stored. You can modify this variable within the script to change the output directory.

## Troubleshooting

- **JDK Not Found**: Ensure that JAVA_HOME is correctly set in your environment variables.
- **Android SDK Issues**: Verify that ANDROID_HOME is set and points to the correct SDK directory.
- **Dependency Errors**: If you encounter errors related to missing modules, run `npm install` to ensure all dependencies are installed.

## Contributing

Contributions to the `buildAPK.js` script are welcome. Please follow the project's contribution guidelines, which can be found in the CONTRIBUTING.md file.

## License

This script is released under the [MIT License](LICENSE.md). Please review the license terms before using or contributing to the project.

## Contact

For questions or assistance regarding the script, please open an issue in the project's GitHub repository.