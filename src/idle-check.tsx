import { showToast, Toast, LaunchType, environment } from "@raycast/api";
import { TimeTracker } from "./timeTracker";

export default async function Command() {
  // Only show toasts if this is a user-initiated launch (for testing)
  const isBackground = environment.launchType === LaunchType.Background;

  const tracker = new TimeTracker();

  // 1. Check if tracking is active
  const active = tracker.getActiveTracking();
  if (!active) {
    if (!isBackground) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Idle Check",
        message: "No active tracking",
      });
    }
    return;
  }

  // 2. Check if in business hours (M-F 9am-6pm)
  if (!tracker.isBusinessHours()) {
    if (!isBackground) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Idle Check",
        message: "Outside business hours",
      });
    }
    return;
  }

  // 3. Check if there's already a pending idle state
  const existingIdle = tracker.getIdleState();
  if (existingIdle) {
    if (!isBackground) {
      await showToast({
        style: Toast.Style.Animated,
        title: "Idle Confirmation Pending",
        message: `Open "Time Tracking Status" to confirm tracking for "${existingIdle.client}"`,
      });
    }
    return;
  }

  // 4. Check if idle (>60 minutes since last activity)
  const idleMinutes = tracker.getIdleMinutes();
  if (idleMinutes <= 60) {
    if (!isBackground) {
      await showToast({
        style: Toast.Style.Success,
        title: "Idle Check",
        message: `Active - ${idleMinutes} minutes idle`,
      });
    }
    return;
  }

  // 5. Pause tracking and create idle state
  const idleState = tracker.pauseTrackingForIdle();
  if (idleState) {
    await showToast({
      style: Toast.Style.Animated,
      title: "Time Tracking Paused",
      message: `You've been idle for ${idleMinutes} minutes. Please confirm when you return.`,
    });
  }
}
