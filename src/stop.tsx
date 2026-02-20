import { showToast, Toast, popToRoot } from "@raycast/api";
import { useState } from "react";
import { TimeTracker } from "./timeTracker";
import { LongSessionHandler } from "./long-session-handler";

export default function Command() {
  const tracker = new TimeTracker();
  const [showLongSessionForm, setShowLongSessionForm] = useState(false);

  // Check for pending idle state and handle it
  const idleState = tracker.getIdleState();
  if (idleState) {
    // User is manually stopping, so finalize the idle state as stopped
    performStopFromIdle(idleState);
    return null;
  }

  // Check for long-running active session before stopping it
  const activeTracking = tracker.getActiveTracking();
  if (activeTracking && !showLongSessionForm) {
    const idleMinutes = tracker.getIdleMinutes();
    if (idleMinutes > 60) {
      setShowLongSessionForm(true);
    }
  }

  if (showLongSessionForm && activeTracking) {
    return (
      <LongSessionHandler
        activeTracking={activeTracking}
        onComplete={async () => {
          // Form handles the stop, just close
          await popToRoot();
        }}
      />
    );
  }

  // No long session, proceed with normal stop
  performNormalStop();
  return null;
}

async function performStopFromIdle(idleState: any) {
  const tracker = new TimeTracker();
  tracker.stopFromIdle(idleState);
  await showToast({
    style: Toast.Style.Success,
    title: "Stopped Tracking",
    message: `"${idleState.client}" - Idle session ended`,
  });
  await popToRoot();
}

async function performNormalStop() {
  const tracker = new TimeTracker();
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
