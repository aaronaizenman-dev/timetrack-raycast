# Time Tracker for Raycast

A simple time tracking extension for Raycast that lets you quickly start and switch between client/project time tracking.

## Features

- **Quick Time Tracking**: Type "Track Time" in Raycast, enter a client name, and start tracking
- **Automatic Switching**: Starting a new timer automatically stops the previous one
- **Local CSV Storage**: All time entries are saved to a CSV file for easy export
- **Real-time Status**: View currently active tracking and today's summary
- **Reports**: View time summaries by day, week, month, or all time

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create an icon file (optional):
   The extension needs an `icon.png` file in the assets directory. You can:
   - Create a 512x512px PNG icon, or
   - Download a clock/timer icon and save it as `icon.png`

3. Start development:
   ```bash
   npm run dev
   ```

## Usage

### Track Time
- Open Raycast (Cmd+Space)
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
