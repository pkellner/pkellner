---
layout: post
status: publish
published: true
title: Silicon Valley Code Campfire Software Architecture Event Summary
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: Silicon Valley Code Campfire Software Architecture Event Summary

---

* * *

**Event Wrap-Up Summary (11/18/23)**

Our recent event encountered streaming challenges, despite having two servers in place. The primary server (AT&T) failed after five minutes, and our secondary server (Zito) struggled with bandwidth throughout the event. This was a departure from the smooth operations of our past events.

**Key Lessons Learned:**

1. **Early Server Activation:** Initiate streaming servers at least an hour before the event to ensure stability. Starting them only 10 minutes prior led to panic and instability.

2. **Resolution Adjustment:** Stream at 720 instead of 1080. This change could halve bandwidth usage and potentially improve presentation quality.

3. **Increased Lag Time:** Adding an extra minute of lag to the stream could enhance quality, allowing for better synchronization with live Q&A sessions and overall stream stability.


By implementing these changes, we aim to avoid similar issues in future events and ensure a smoother streaming experience.

