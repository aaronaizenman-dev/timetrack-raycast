# Time Tracker for Raycast

A simple time tracking extension for Raycast that lets you quickly start and switch between client/project time tracking.

## Features

- **Quick Time Tracking**: Type "Track Time" in Raycast, enter a client name, and start tracking
- **Automatic Switching**: Starting a new timer automatically stops the previous one
- **Local CSV Storage**: All time entries are saved to a CSV file for easy export
- **Real-time Status**: View currently active tracking and today's summary
- **Reports**: View time summaries by day, week, month, or all time

## Installation

### Step 1: Install Raycast

If you don't have Raycast installed:
1. Go to [raycast.com](https://www.raycast.com/)
2. Download and install Raycast
3. Open Raycast from Applications or set up a hotkey:
   - Open System Settings → Keyboard → Keyboard Shortcuts → Spotlight
   - Uncheck "Show Spotlight search"
   - Open Raycast → Settings → General
   - Set your Raycast hotkey (commonly Cmd+Space)

### Step 2: Open Terminal

1. Open Spotlight or Raycast (Cmd+Space, Opt+Space, or just search in Finder)
2. Type "Terminal" and press Enter

### Step 3: Install Homebrew (if needed)

Check if you have Homebrew installed:
```bash
brew --version
```

If you see a version number, skip to Step 4. If not, install Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. You may need to enter your computer password.

**Important:** After installation, Homebrew will show instructions to add it to your PATH. Copy and run those commands in Terminal (they'll look like `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`).

After running those commands, close and reopen Terminal.

### Step 4: Set Up Node.js

#### 4a. Check Your Current Node.js Version

```bash
node --version
```

**If you see `v20.x.x` or higher (like `v22.x.x`):** You're all set! Skip to Step 5.

**If you see `v18.x.x` or lower:** Continue to 4b to upgrade.

**If you see "command not found":** Continue to 4c to install Node.js.

#### 4b. Upgrade Node.js (if you have an old version)

First, check which tool is managing your Node.js installation:

```bash
which node
```

**If the output contains `.nodenv`:**

Install Node 20 with nodenv:
```bash
nodenv install 20.18.1
```

Set it as your global default:
```bash
nodenv global 20.18.1
```

Refresh nodenv:
```bash
nodenv rehash
```

Verify the installation:
```bash
node --version
```

**If the output contains `.nvm`:**

Install Node 20 with nvm:
```bash
nvm install 20
```

Set it as default:
```bash
nvm alias default 20
```

Verify the installation:
```bash
node --version
```

**If the output contains `.asdf`:**

Install Node 20 with asdf:
```bash
asdf install nodejs 20.18.1
```

Set it as global default:
```bash
asdf global nodejs 20.18.1
```

Verify the installation:
```bash
node --version
```

**If the output is `/usr/local/bin/node` or `/opt/homebrew/bin/node` (Homebrew):**

Upgrade Node with Homebrew:
```bash
brew upgrade node
```

Verify the installation:
```bash
node --version
```

**If none of these match or you're unsure:**

Reinstall with Homebrew (simplest option):
```bash
brew install node
```

Verify the installation:
```bash
node --version
```

#### 4c. Install Node.js (if you don't have it)

Check if you have a version manager already installed.

Check for nodenv:
```bash
command -v nodenv
```

Check for nvm:
```bash
command -v nvm
```

Check for asdf:
```bash
command -v asdf
```

**If any of these exist, use that version manager:**

For nodenv:
```bash
nodenv install 20.18.1
```
```bash
nodenv global 20.18.1
```
```bash
nodenv rehash
```

For nvm:
```bash
nvm install 20
```
```bash
nvm alias default 20
```

For asdf:
```bash
asdf plugin add nodejs
```
```bash
asdf install nodejs 20.18.1
```
```bash
asdf global nodejs 20.18.1
```

**If none exist (recommended for most users):**

Install Node with Homebrew:
```bash
brew install node
```

Verify the installation:
```bash
node --version
```

You should see version 20 or higher.

### Step 5: Download This Extension

1. Download this repository as a ZIP file (click the green "Code" button, then "Download ZIP")
2. Unzip the file to a location you'll remember (like your Documents or Desktop folder)

### Step 6: Install Extension Dependencies

In Terminal, navigate to the extension folder. Replace the path with where you saved the folder (assuming in this example you downloaded the main branch):
```bash
cd ~/Desktop/timetrack-raycast-main
```

Or if you put it in Documents:
```bash
cd ~/Documents/timetrack-raycast-main
```

**Tip:** You can also drag the folder from Finder into Terminal after typing `cd ` (with a space).

Then install the required packages:
```bash
npm install
```

This may take a minute or two.

### Step 7: Load the Extension in Raycast

```bash
npm run dev
```

You should see a message that Raycast is watching for changes. The extension is now loaded! At this point, you can exit the terminal, and use Track Time in Raycast!

### Step 8: Start Using It!

1. Open Raycast (use your hotkey, typically Cmd+Space)
2. Type "Track Time" and you should see the Time Tracker commands
3. The extension is ready to use!

## Troubleshooting

### Node.js Version Issues

**Error: "TypeError: getDefaultHighWaterMark is not a function"**
- This means you're using Node.js version 18 or lower
- Follow Step 4b above to upgrade to Node 20 or higher

**"node --version" shows the wrong version after installing**
1. Close and reopen Terminal completely
2. Check which Node is being used:
   ```bash
   which node
   ```
3. Check if you have multiple Node installations:

   Check for Homebrew Node:
   ```bash
   brew list node 2>/dev/null && echo "Homebrew Node found"
   ```

   Check for nodenv versions:
   ```bash
   nodenv versions 2>/dev/null && echo "nodenv versions found"
   ```

   Check for nvm versions:
   ```bash
   nvm list 2>/dev/null && echo "nvm versions found"
   ```

   Check for asdf versions:
   ```bash
   asdf list nodejs 2>/dev/null && echo "asdf versions found"
   ```

4. You may have multiple version managers conflicting. Choose one:
   - **Recommended:** Uninstall others and use Homebrew for simplicity
   - **Or:** Stick with one version manager (nodenv/nvm/asdf) and uninstall Homebrew's Node

**To clean up and start fresh with Homebrew Node:**

Uninstall Homebrew Node (if exists):
```bash
brew uninstall node 2>/dev/null
```

Reinstall fresh:
```bash
brew install node
```

Close and reopen Terminal, then verify:
```bash
node --version
```

### Installation Issues

**"command not found: npm"**
- npm comes with Node.js - if missing, your Node installation is incomplete
- Reinstall Node following Step 4 above

**"command not found: brew"**
- Make sure you completed Step 3 to install Homebrew
- If just installed, verify you ran the PATH setup commands Homebrew showed
- Close and reopen Terminal

**Extension not showing in Raycast**
- Make sure Terminal is still open with `npm run dev` running
- Try restarting Raycast: Quit Raycast completely (right-click menu bar icon → Quit) and reopen

**"npm install" fails or shows EACCES permission errors**
- Never use `sudo npm install` - this causes permission problems
- If you see permission errors, your npm setup has issues
- Fix with: `sudo chown -R $(whoami) ~/.npm`
- Or reinstall Node cleanly following Step 4

## Usage

### Track Time
- Open Raycast (use your hotkey, typically Cmd+Space)
- Type "Track Time"
- Enter your client/project name (e.g., "client 1")
- Press Enter

Switching clients is just as easy - run the command again with a different client name, and it will automatically stop the previous timer and start the new one.

### Stop Tracking
- Open Raycast (Cmd+Space)
- Type "Stop Tracking"
- Press Enter

This will stop the current timer and save your time entry without starting a new one.

### View Status
- Open Raycast
- Type "Time Tracking Status"
- See your currently active tracking and today's summary

### View Reports
- Open Raycast
- Type "Time Report"
- Use the dropdown to select time range (Today, Last 7 Days, Last 30 Days, All Time)

## Data Storage

Time entries are stored in:
- CSV file: `~/Library/Application Support/com.raycast.macos/extensions/timetrack/time-entries.csv`
- Active tracking: `~/Library/Application Support/com.raycast.macos/extensions/timetrack/active-tracking.json`

The CSV format is:
```csv
client,startTime,endTime,durationMinutes
"client 1","2024-02-09T10:00:00.000Z","2024-02-09T11:30:00.000Z",90
```

## Future Enhancements

- Add the ability to have a popup/notification every hour to ask what I've been up to the past hour
- Kantata integration for syncing time entries
- Custom date range reports
- Export to other formats
- Edit/delete entries
- Project tags and categories
