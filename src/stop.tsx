import { showToast, Toast, popToRoot } from "@raycast/api";
import { TimeTracker } from "./timeTracker";

export default async function Command() {
  const tracker = new TimeTracker();

  // Check for pending idle state and handle it
  const idleState = tracker.getIdleState();
  if (idleState) {
    // User is manually stopping, so finalize the idle state as stopped
    tracker.stopFromIdle(idleState);
    await showToast({
      style: Toast.Style.Success,
      title: "Stopped Tracking",
      message: `"${idleState.client}" - Idle session ended`,
    });
    await popToRoot();
    return;
  }

  // Normal stop flow
  const entry = tracker.stopTracking();

  if (entry) {
    const duration = tracker.formatDuration(entry.durationMinutes || 0);
    await showToast({
      style: Toast.Style.Success,
      title: "Stopped Tracking",
      message: `"${entry.client}" - ${duration}`,
    });
  } else {
    await showToast({
      style: Toast.Style.Failure,
      title: "No Active Tracking",
      message: "There's nothing currently being tracked",
    });
  }

  await popToRoot();
}
