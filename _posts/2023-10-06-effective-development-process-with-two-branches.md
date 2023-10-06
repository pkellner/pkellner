---
layout: post
status: publish
published: true
title: Effective Development Process with Two Branches, Dev and Prod
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: Transitioning a significant web platform, such as the SiliconValley-CodeCamp.com website, is no small feat. As I delve deep into modernizing the site, I've taken on the challenge of porting it to Next.js 13, leveraging the power of React and the latest addition of server components. The magnitude of this change underscores the necessity of a meticulous and reliable development process. Even as a solo developer on this project, the importance of a robust process cannot be overstated. In the world of web development, particularly when revamping major platforms, adhering to a trusted methodology ensures the website remains operational during development, ensuring a smooth transition for its users.

---

### Effective Development Process with Two Branches: Dev and Prod

Transitioning a significant web platform, such as the  [SiliconValley-CodeCamp.com](https://siliconvalley-codecamp.com) website, is no small feat. As I delve deep into modernizing the site, I've taken on the challenge of porting it to Next.js 13, leveraging the power of React and the latest addition of server components. The magnitude of this change underscores the necessity of a meticulous and reliable development process. Even as a solo developer on this project, the importance of a robust process cannot be overstated. In the world of web development, particularly when revamping major platforms, adhering to a trusted methodology ensures the website remains operational during development, ensuring a smooth transition for its users.

#### The Golden Rule:

**NEVER MAKE CHANGES TO `PROD` DIRECTLY. ALWAYS WORK IN `DEV` AND MERGE OVER.**

Embracing this rule ensures that any code destined for production has first undergone rigorous tests in a development environment.

#### Step-by-Step Process:

1. **Always Work in Branch `dev`**: This branch is the foundation of all development endeavors. It's where innovations, bug fixes, and updates are conceived and implemented. Think of the `dev` branch as your creative workshop.

2. **Update `.github` for `dev`**: Should you have CI/CD configurations or GitHub Actions within a `.github` directory, they must be tailored to suit the development environment's needs.

3. **Commit to `dev`, Build, and Test**: Post your modifications to the `dev` branch, then build and test. Validating your work in this environment is paramount to intercept any potential issues before they infiltrate the production realm.

4. **Switch to the `prod` Branch**: Once you're confident in your `dev` updates, transition to the `prod` branch, reflecting your code's production-ready state.

5. **Merge with GitHub**: Integrate the updates from `dev` into `prod`. Depending on your personal workflow, this might involve crafting a Pull Request, even if it's just for review and documentation purposes.

6. **Update `.github` Production Files**: Fine-tune any CI/CD configurations or GitHub Actions within the `.github` folder for the production setting, ensuring that production-specific tasks are executed correctly.

7. **Commit to `prod`**: After validating all settings, commit your alterations to the `prod` branch.

8. **Switch Back to `dev` and Keep Innovating**: Having updated the `prod` branch, revert to `dev` and persist in your development journey.

#### The Importance of a Disciplined Process

In conclusion, while the overhaul of  [SiliconValley-CodeCamp.com](https://siliconvalley-codecamp.com) to [Next.js 13](https://nextjs.org/) with [React](https://react.dev/) and server components is ambitious, maintaining a disciplined development process is the bedrock of ensuring uninterrupted service to its users. Whether you're a team of many or a solo developer like in this scenario, the principles remain the same. A rigorous, systematic approach not only ensures smooth transitions but also underscores the professional integrity of your work. As the site evolves, it's this commitment to process that will stand as a testament to the seamless user experience, even amidst significant backend changes.