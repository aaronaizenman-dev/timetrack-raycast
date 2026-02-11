import { showToast, Toast, LaunchProps, popToRoot, confirmAlert, Alert, Icon } from "@raycast/api";
import { TimeTracker } from "./timeTracker";

interface TrackArguments {
  client: string;
}

export default async function Command(props: LaunchProps<{ arguments: TrackArguments }>) {
  const { client } = props.arguments;

  if (!client || client.trim().length === 0) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: "Please provide a client name",
    });
    return;
  }

  const tracker = new TimeTracker();

  // Check for pending idle confirmation
  const idleState = tracker.getIdleState();
  if (idleState) {
    const isSameClient = idleState.client.toLowerCase() === client.trim().toLowerCase();
    const message = isSameClient
      ? `You were tracking "${idleState.client}". Have you been working on this during the idle time?`
      : `You were tracking "${idleState.client}". Have you been working on this? (You'll then switch to "${client.trim()}")`;

    const confirmed = await confirmAlert({
      title: "Idle Tracking Detected",
      message,
      icon: Icon.QuestionMark,
      primaryAction: {
        title: "Yes, I was working",
        style: Alert.ActionStyle.Default,
      },
      dismissAction: {
        title: "No, I wasn't",
        style: Alert.ActionStyle.Destructive,
      },
    });

    if (confirmed) {
      tracker.resumeFromIdle(idleState);
      if (!isSameClient) {
        await showToast({
          style: Toast.Style.Success,
          title: "Idle Time Counted",
          message: `Counted idle time for "${idleState.client}", now switching to "${client.trim()}"`,
        });
      } else {
        await showToast({
          style: Toast.Style.Success,
          title: "Tracking Resumed",
          message: `Resumed tracking "${idleState.client}"`,
        });
      }
    } else {
      tracker.stopFromIdle(idleState);
      await showToast({
        style: Toast.Style.Success,
        title: "Idle Time Not Counted",
        message: `Starting fresh with "${client.trim()}"`,
      });
    }
  }

  // Now start tracking the new client
  const result = tracker.startTracking(client.trim());

  if (result.previousClient) {
    await showToast({
      style: Toast.Style.Success,
      title: "Switched Tracking",
      message: `Stopped "${result.previousClient}", now tracking "${result.newClient}"`,
    });
  } else {
    await showToast({
      style: Toast.Style.Success,
      title: "Started Tracking",
      message: `Now tracking "${result.newClient}"`,
    });
  }

  await popToRoot();
}
