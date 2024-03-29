# vscode-wordpress-salts

> Offline WordPress salt key generation for PHP, YAML and DotEnv files

[![Version](https://img.shields.io/github/v/release/idleberg/vscode-wordpress-salts?style=for-the-badge)](https://github.com/idleberg/vscode-wordpress-salts/releases)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/idleberg.wordpress-salts?style=for-the-badge&label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=idleberg.wordpress-salts)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/idleberg/wordpress-salts?style=for-the-badge&label=Open%20VSX)](https://open-vsx.org/extension/idleberg/wordpress-salts)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/vscode-wordpress-salts/default.yml?style=for-the-badge)](https://github.com/idleberg/vscode-wordpress-salts/actions)

## Installation

### Extension Marketplace

Launch Quick Open, paste the following command, and press <kbd>Enter</kbd>

`ext install idleberg.wordpress-salts`

### CLI

With [shell commands](https://code.visualstudio.com/docs/editor/command-line) installed, you can use the following command to install the extension:

`$ code --install-extension idleberg.wordpress-salts`

### Packaged Extension

Download the packaged extension from the the [release page](https://github.com/idleberg/vscode-wordpress-salts/releases) and install it from the command-line:

```bash
$ code --install-extension path/to/wordpress-salts-*.vsix
```

Alternatively, you can download the packaged extension from the [Open VSX Registry](https://open-vsx.org/) or install it using the [`ovsx`](https://www.npmjs.com/package/ovsx) command-line tool:

```bash
$ ovsx get idleberg.wordpress-salts
```

### Clone Repository

Change to your Visual Studio Code extensions directory:

```bash
# Windows
$ cd %USERPROFILE%\.vscode\extensions

# Linux & macOS
$ cd ~/.vscode/extensions/
```

Clone repository as `wordpress-salts`:

```bash
$ git clone https://github.com/idleberg/vscode-wordpress-salts wordpress-salts
```

Install extension dependencies:


```bash
$ cd wordpress-salts && npm install
```

## Usage

Run the *WordPress Salts: Insert* from the [command palette](https://code.visualstudio.com/docs/editor/codebasics#_command-palette) to insert salts at the current cursor position. The output format is determined by the scope of the active document.

## Related

- [atom-wordpress-salts](https://atom.io/packages/wordpress-salts)
- [sublime-wordpress-salts](https://packagecontrol.io/packages/WordPress%20Salts)
- [wp-salts-cli](https://www.npmjs.com/package/wp-salts-cli)

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)
