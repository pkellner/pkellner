---
title: OBS Recording Resolution 4K Even Though Display is 1080P
description: Set OBS base resolution to 4K and output to 1080P to capture entire screen on Retina MacBooks.
pubDatetime: 2024-05-12T01:27:29.043Z
preview: /postimages2024/obs-scale.png
draft: true
tags:
    - obs
categories:
    - obs
type: default
---
# OBS Recording Resolution 4K Even Though Display is 1080P

I've wrestled with this problem for a while with [OBS](https://obsproject.com/) and always seem to bump into it. Here is what I've learned. Basically, you should set the base resolution to 3840x2160 and the output resolution to 1920x1080. Here are the details.

![](/postimages2024/obs-scale.png)

When using OBS on a MacBook with a high-resolution display, you might encounter this issue because the MacBook's Retina display effectively doubles the pixel density of what is being displayed. This means the actual resolution of the screen is higher than what appears in standard settings. Here's a breakdown of what's happening:

1. **Retina Display and Pixel Density**: MacBook screens with Retina displays have a high pixel density, where multiple screen pixels are used to create a single logical pixel. This results in a very sharp display but can create mismatches in applications not optimized for high DPI settings.

2. **Base Canvas Resolution in OBS**: The base canvas resolution in OBS is essentially the resolution at which you are capturing your content. Setting it to the MacBook's native resolution (3840x2160 in your case) means OBS captures the whole screen at its full resolution.

3. **Output (Scaled) Resolution**: This is the resolution at which the video will be outputted or streamed. By setting this to 1920x1080, you're asking OBS to downscale the captured 3840x2160 resolution to a more manageable 1920x1080 resolution. This downscaling helps in managing file sizes and can reduce the strain on bandwidth for streaming, while still retaining a high-quality image.

4. **Why Setting Both to 1920x1080 Captures Only a Quarter of the Screen**: If both are set to 1920x1080, OBS tries to capture a 1920x1080 area from a 3840x2160 display. Because of the pixel density, this results in only a quarter of the screen being captured — effectively the top-left corner of your screen.

To resolve this, you correctly set your base canvas to the native resolution of your screen (3840x2160) and scale the output down to 1920x1080. This allows OBS to capture the entire screen content and then scale it down to a standard resolution, ensuring that the video is compatible with most displays and streaming services while retaining clarity and detail.

Will you loose output quality?

When you downscale your output from 3840x2160 (4K) to 1920x1080 (Full HD) in OBS, the quality of the video is affected, but the loss might not be as significant as you might expect. Here’s what happens:

1. **Increased Sharpness and Clarity**: Downscaling can actually improve perceived sharpness and detail in the video. Because you're compressing more pixels into a smaller space, the details can appear more defined in the output video.

2. **Reduced File Size and Bandwidth**: A 1920x1080 resolution video has a quarter of the pixels of a 3840x2160 video. This means the output file will be smaller, which is beneficial for storage and bandwidth, especially if you're streaming. This also makes the video more accessible to viewers with different types of devices and internet speeds.

3. **Potential Loss of Detail**: While downscaling generally increases sharpness, it can sometimes result in the loss of very fine details, especially if the original content includes very small text or intricate graphics. This is usually not noticeable for standard video content but can be a factor depending on what you are recording or streaming.

4. **Good Quality Retention**: Modern encoding technologies and OBS’s scaling algorithms are quite effective. They ensure that the quality loss during downscaling is minimal, maintaining a good balance between file size and visual fidelity.

Overall, if done correctly, downscaling from 4K to 1080p in OBS should retain high video quality, making it suitable for most viewing scenarios. The key is to ensure that you use high-quality scaling settings in OBS and a good encoding format to maintain as much of the original detail as possible.