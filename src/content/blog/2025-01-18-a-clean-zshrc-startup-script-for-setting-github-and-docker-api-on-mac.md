---
title: A Clean .zshrc Startup Script for Setting Github and Docker API Keys on a Mac
description: In this blog post, we present a streamlined zshrc startup script on macOS that sets environment variables and logs into Docker in the background. We also explore how minimal logging and background execution can improve your workflow.
pubDatetime: 2025-01-18T05:25:20-08:00
preview: ""
draft: false
tags:
  - macos
  - shell
  - zsh
  - docker
  - github
categories:
  - macos
type: default
---

# A Clean zshrc Startup Script for Setting Github and Docker API Keys on a Mac

In this post, we’ll look at a **zshrc startup script** that helps you **silently set** API keys for GitHub and Docker on macOS. The script runs **in the background**, giving you immediate access to your terminal prompt. It logs successes to a file and only surfaces errors in real time, so you can fix them quickly. This setup is particularly helpful if you’re constantly switching between projects—or just want a clean, quiet workflow.

Below is the complete script. We’ve **obscured the real passwords**, so be sure to insert your own values in place of `sk-****` and `ghp_****`!

---

## The Script

```bash
#!/bin/bash

LOG_FILE="./env-setup.log"

# Obscured keys; replace with your real values
OPENAI_API_KEY="sk-****"
GH_TOKEN="ghp_****"

echo "Setting OPENAI_API_KEY and GH_TOKEN, then logging in to Docker... (working in background)"
echo "Check \"$LOG_FILE\" for details if anything seems off."

# Function to check if OpenAI API key is valid.
check_openai_key() {
  http_status=$(curl -s -o /dev/null -w "%{http_code}" \
    https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY")

  if [ "$http_status" -ne 200 ]; then
    echo "Error: Unable to validate OPENAI_API_KEY (HTTP $http_status)" | tee -a "$LOG_FILE"
  else
    echo "Success: Valid OPENAI_API_KEY (HTTP $http_status)" >> "$LOG_FILE"
  fi
}

{
  # 1. Export the OpenAI key
  if ! export OPENAI_API_KEY="$OPENAI_API_KEY"; then
    echo "Error: Failed to set OPENAI_API_KEY." | tee -a "$LOG_FILE"
  else
    echo "Success: OPENAI_API_KEY set successfully." >> "$LOG_FILE"
    check_openai_key
  fi

  # 2. Export the GitHub token
  if ! export GH_TOKEN="$GH_TOKEN"; then
    echo "Error: Failed to set GH_TOKEN." | tee -a "$LOG_FILE"
  else
    echo "Success: GH_TOKEN set successfully." >> "$LOG_FILE"
  fi

  # 3. Docker login
  # If token is invalid, you'll see "Error: Docker login failed." in console.
  if ! echo "$GH_TOKEN" | docker login ghcr.io -u pkellner --password-stdin >/dev/null 2>&1; then
    echo "Error: Docker login failed." | tee -a "$LOG_FILE"
  else
    echo "Success: Docker login succeeded." >> "$LOG_FILE"
  fi
} & disown
```

---

## TL;DR

- **What**: A lean, background startup script that sets your GitHub and Docker keys.  
- **Why**: To keep your terminal prompt free for immediate use while still ensuring credentials are set.  
- **How**: By running in the background, logging successes quietly, and only showing errors in real time.

---

## Understanding the Script

### 1. Minimal, Non-Blocking Output

When you open a new terminal (or source your zshrc), you see a single message:  
```bash
Setting OPENAI_API_KEY and GH_TOKEN, then logging in to Docker... (working in background)
Check "./env-setup.log" for details if anything seems off.
```
Because we use `{ ... } & disown`, the commands run asynchronously. This means you can **immediately** type commands in your terminal without waiting for Docker login or environment variable exports to complete.

### 2. Error-Only Console Messages

Success messages are quietly appended to the `env-setup.log` file; **failures**, however, print to both the log and your console using:
```bash
| tee -a "$LOG_FILE"
```
So if your token is invalid, or your OpenAI API key is incorrect, you’ll see a real-time error like:

```
Error: Docker login failed.
Error: Unable to validate OPENAI_API_KEY (HTTP 401)
```

This approach keeps your shell **clean** yet informative.

### 3. Helpful for Private Keys & Background Tasks

This script is perfect when you’re regularly switching projects or handling multiple API keys. It sets them automatically without crowding your console with unneeded text. You only see critical **errors** that need attention, keeping the developer workflow streamlined.

## Integrating into Your zshrc

To have this script run whenever you open a new terminal, do one of the following:

- **Option A**: Copy its contents into your `~/.zshrc`.  
- **Option B**: Save the script as `env-setup.sh` and add a line to `~/.zshrc`:
  ```bash
  source /path/to/env-setup.sh
  ```

Because this script is non-blocking, your shell experience is smooth from the start.

## Background Details

### Why Run in the Background?

Running in the background ensures your prompt isn’t **blocked** by network calls (like Docker login or an API request). This is especially important if you’re on a slow connection or if Docker decides to take its time. Meanwhile, your logs still capture successes, and errors surface immediately.

### How We Developed This

This script was developed with the help of **ChatGPT o1 model**. It took **about 10 iterations** to get the exact desired behavior: minimal console noise, immediate shell availability, success logging, and real-time error notices. That iteration process underscored how easy it is to refine scripts and precisely tailor them to your workflow.

## Conclusion

Setting **environment variables** and **logging into Docker** on macOS can be painless and neat. By leveraging background processes and thoughtful logging:

1. You preserve a clutter-free terminal.
2. You only see **errors** when something is genuinely wrong.
3. You still have a comprehensive record of successes in the log file.

Whether you’re working solo or juggling multiple APIs, a **clean zshrc startup script** is a small but powerful enhancement to your Mac development environment. Give it a try, tweak it to suit your needs, and enjoy the peace of mind that comes from a tidy, error-aware setup.
