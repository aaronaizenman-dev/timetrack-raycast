import { showToast, Toast, popToRoot, Detail } from "@raycast/api";
import { useEffect, useRef, useState } from "react";
import { TimeTracker, ActiveTracking } from "./timeTracker";
import { LongSessionHandler } from "./long-session-handler";

export default function Command() {
  const [showLongSessionForm, setShowLongSessionForm] = useState(false);
  const [activeTracking, setActiveTracking] = useState<ActiveTracking | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function run() {
      const tracker = new TimeTracker();

      // Check for pending idle state and handle it
      const idleState = tracker.getIdleState();
      if (idleState) {
        tracker.stopFromIdle(idleState);
        await showToast({
          style: Toast.Style.Success,
          title: "Stopped Tracking",
          message: `"${idleState.client}" - Idle session ended`,
        });
        await popToRoot();
        return;
      }

      // Check for long-running active session before stopping it
      const active = tracker.getActiveTracking();
      if (active) {
        const idleMinutes = tracker.getIdleMinutes();
        if (idleMinutes > 60) {
          setActiveTracking(active);
          setShowLongSessionForm(true);
          return;
        }
      }

      // No long session, proceed with normal stop
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

    run();
  }, []);

  if (showLongSessionForm && activeTracking) {
    return (
      <LongSessionHandler
        activeTracking={activeTracking}
        onComplete={async () => {
          await popToRoot();
        }}
      />
    );
  }

  return <Detail isLoading={true} markdown="" />;
}
