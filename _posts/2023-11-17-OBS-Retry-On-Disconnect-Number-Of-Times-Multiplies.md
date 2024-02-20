---
layout: post
status: publish
published: true
title: Understanding OBS Backup Server Transition and Quick Reconnection Strategy
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: When streaming with OBS and using a backup server, transitioning back to the primary server can be slow as it doubles the reconnection wait time each attempt. A workaround involves stopping the stream while disconnected, then reconnecting to the internet and resuming the stream, although this method has limitations.

---

# Understanding OBS Backup Server Transition and Quick Reconnection Strategy

### Automatic Transition to Backup Server in OBS

When streaming with OBS ([Open Broadcaster Software](https://obsproject.com/)), a common practice is to have a backup server configured alongside the main server. This setup ensures that if the main server encounters issues, OBS automatically switches to the backup server, maintaining the stream's continuity. However, the process isn't seamless when the main server regains its functionality.

### Issue with Main Server Reconnection

A noticeable inconvenience arises when the main server attempts to reconnect to the internet. Each time it searches for a connection and fails, it doubles the waiting time before trying again. This delay becomes problematic for streamers who prefer to switch back to their primary server as soon as it's available.

### Workaround for Quick Reconnection

Based on my experimentation with the current version of OBS as of November 17, 2023, I've discovered a workaround for this issue:

1. **Interrupting the Stream:** When your primary server loses connection, you can press the 'stop streaming' button in OBS. Despite receiving a warning about terminating your stream, the disconnection from the internet actually prevents this from happening.

2. **Reconnecting to the Internet:** You can then reconnect your primary server to the internet in your preferred manner.

3. **Restarting the Stream:** Once reconnected, you can start streaming again by selecting 'manage streams', picking your stream, and reconnecting. This method allows for a quicker transition back to your primary server.


### Caution and Limitations

* **Variable Results:** This method may not yield consistent results for everyone, so proceed with caution.
* **Potential Future Changes:** OBS updates might alter how the software handles stream termination, potentially leading to an actual termination of the stream when the 'stop streaming' button is pressed.
* **Lack of Official Support:** Currently, there are limited documentation and functionality regarding this specific scenario in OBS.

### Concluding Thoughts

Despite these challenges, it's important to acknowledge the immense value OBS offers, especially as a free tool. The lack of certain features or documentation can be frustrating, but the overall utility of OBS in the streaming community remains significant. This workaround is just one of the many ways users can adapt to and overcome the software's limitations.