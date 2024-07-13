# Project Documentation

## Overview

This project is designed to automate the process of generating Android APK files from web applications. It provides a web interface where users can submit their web app details, including the website URL, app name, primary and secondary colors, app logo, and splash screen. The backend, written in JavaScript, handles these inputs to dynamically generate a custom APK file.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Bun installed
- Android SDK and Java Development Kit (JDK) for APK generation
- Properly set JAVA_HOME and ANDROID_HOME environment variables

### Installation

1. Clone the repository to your local machine.
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory.
   ```bash
   cd <project-directory>
   ```
3. Install the necessary npm packages.
   ```bash
   bun install
   ```

## Usage

The project consists of a web interface for input submission and a backend service for processing these inputs and generating the APK. The main file, `index.js`, sets up the server and endpoints.

### Running the Server

To start the server, run:
```bash
bun index.js
```
This will start the server on the default port defined in your environment or on port 3000 if not specified.

### Submitting a Request

To submit a request for APK generation, navigate to the provided web interface and fill in the required fields:
- Website URL
- App Name
- Primary Color
- Secondary Color
- App Logo (file upload)
- Splash Screen (file upload)

Upon submission, the backend processes these inputs to generate an APK file.

### API Endpoint

The main API endpoint for submitting APK build requests is `/submit-app`, which accepts POST requests with the required data.

## Key Components

### APK Generation Logic

The core functionality for generating APKs is encapsulated in the [`buildAPK`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fikku%2Frnd%2Fwebtoapk%2FbuildAPK.js%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A4%2C%22character%22%3A0%7D%5D "buildAPK.js") function, which takes website details and media files as input and produces an APK file. This process involves several steps, including setting up the Android project, customizing it based on the inputs, and compiling it into an APK.

### File Handling

The project uses `multer` for handling file uploads. The uploaded app logo and splash screen are temporarily stored in the server and later cleaned up after the APK generation process completes.

### Error Handling

The server provides basic error handling for missing parameters and failures during the APK generation process. It responds with appropriate HTTP status codes and error messages.

## Troubleshooting

- Ensure all prerequisites are installed and properly configured.
- Check environment variables for correct paths to JAVA_HOME and ANDROID_HOME.
- For issues related to file uploads, verify the server has write permissions to the designated directories.

## Contributing

Contributions to the project are welcome. Please follow the standard fork-and-pull request workflow. Ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or to report issues, please file an issue on the project's GitHub repository.


# Documentation for [`buildAPK.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fikku%2Frnd%2Fwebtoapk%2FbuildAPK.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ikku/rnd/webtoapk/buildAPK.js")

## Overview

The [`buildAPK.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fikku%2Frnd%2Fwebtoapk%2FbuildAPK.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ikku/rnd/webtoapk/buildAPK.js") script is designed to automate the process of building Android APK files from your project's source code. This documentation provides a comprehensive guide on how to use the script, its requirements, and additional information to ensure a smooth APK generation process.

## Requirements

- **Node.js**: Ensure you have Node.js installed on your system to run the script. You can download it from [Node.js official website](https://nodejs.org/).
- **Bun.sh**: Ensure you have bun installed on your system to run the script. You can download it from [Bun.sh official website](https://bun.sh/).
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
3. **Install Dependencies**: Use bun to install the project's dependencies.
   ```bash
   bun install
   ```

## Usage

To build an APK using the `buildAPK.js` script, follow these steps:

1. **Open Terminal**: Ensure you're in the project's root directory.
2. **Run the Script**: Execute the script using bun.
   ```bash
   bun buildAPK.js
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