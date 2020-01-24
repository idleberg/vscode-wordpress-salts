# vscode-wordpress-salts

[![The MIT License](https://flat.badgen.net/badge/license/MIT/orange)](http://opensource.org/licenses/MIT)
[![GitHub](https://flat.badgen.net/github/release/idleberg/vscode-wordpress-salts)](https://github.com/idleberg/vscode-wordpress-salts/releases)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/idleberg.wordpress-salts.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=idleberg.wordpress-salts)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/vscode-wordpress-salts)](https://circleci.com/gh/idleberg/vscode-wordpress-salts)
[![David](https://flat.badgen.net/david/dep/idleberg/vscode-wordpress-salts)](https://david-dm.org/idleberg/vscode-wordpress-salts)

Context-aware WordPress salt key insertion for PHP, YAML and DotEnv files without the need of an internet-connection

## Installation

### Extension Marketplace

Launch Quick Open, paste the following command, and press <kbd>Enter</kbd>

`ext install wordpress-salts`

### Packaged Extension

Download the package extension from the the [release page](https://github.com/idleberg/vscode-wordpress-salts/releases) and install it from the command-line:

```bash
$ code --install-extension wordpress-salts-*.vsix
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

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/vscode-applescript) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
