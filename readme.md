# 🤖 Roblox API Scraper

## 🌟 Overview

This Node.js script uses Puppeteer to scrape Roblox Engine class documentation and exports the data into different file formats: JSON, Markdown (MD), and plain text (TXT). The script fetches class names and their respective documentation links from Roblox's official API reference.

## 🚀 Features

- Scrapes Roblox Engine class names and links from [Roblox API Documentation](https://create.roblox.com/docs/reference/engine/classes)
- Saves the data in the specified format: JSON, Markdown, or TXT
- Provides an option to list all available output file types

## ⚙️ Prerequisites

- 🟢 Node.js installed on your system
- 📦 Puppeteer package (installed via npm)

## 📥 Installation

1. Clone the repository or download the script.

2. Navigate to the script directory and install dependencies:

   ```sh
   npm install puppeteer
   ```

## 🛠 Usage

Run the script using Node.js with the desired output format:

```sh
node script.js <fileType>
```

### 📌 Supported File Types

- 🗂 `json` - Outputs data as a structured JSON file.
- 📜 `md` - Outputs data in Markdown format.
- 📝 `txt` - Outputs data in plain text format.
- 📋 `list` - Lists all available file type options.

### 💡 Example Commands

```sh
node script.js json   # Saves data as RobloxApi.json
node script.js md     # Saves data as RobloxApi.md
node script.js txt    # Saves data as RobloxApi.txt
node script.js list   # Displays available file types
```

## 📂 Output Files

- **📄 RobloxApi.json**: A JSON file containing class names and links.
- **📑 RobloxApi.md**: A Markdown file with a formatted list of class names and links.
- **📃 RobloxApi.txt**: A plain text file listing class names and links.

## 🔍 Notes

- The script runs headlessly using Puppeteer and emulates a real browser session.
- It sets a user agent and viewport to ensure compatibility with Roblox's site.

## 📜 License

This project is licensed under the MIT License.