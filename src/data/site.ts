import type { BrandColor } from "@utils/posts";

export const EMAIL = "peterkellnerblog@svcc.zendesk.com";
export const PLURALSIGHT_PROFILE = "https://app.pluralsight.com/profile/author/peter-kellner";

export interface Course {
  title: string;
  url: string;
  image: string;
  color: BrandColor;
  short: string;
  long: string;
}

export const COURSES: Course[] = [
  {
    title: "What is React",
    url: "https://pluralsight.pxf.io/2r6ORa",
    image: "/courseimages/low/what-is-react.png",
    color: "blue",
    short: "Why React is the number one JavaScript library for building apps in a browser, from components to the virtual DOM to JSX.",
    long: "You’ll learn about the component-based nature of React and how that translates into highly performant, easy to use web applications. You’ll explore how React addresses building component-based web apps, discover how its virtual DOM keeps the UI in sync, and learn how React uses the JSX syntax to represent components and the UI of a running app.",
  },
  {
    title: "React 18 Components",
    url: "https://pluralsight.pxf.io/GmB2a2",
    image: "/courseimages/low/react-18-working-components.png",
    color: "red",
    short: "Build React apps that use components the best possible way while minimizing resources and maximizing the browser UI experience.",
    long: "Creating UIs in React is all about independent components that work together. You’ll explore the primitive methods for sharing props and state, share data globally with the Context API, handle errors so users keep a great experience, and improve performance by minimizing over-rendering.",
  },
  {
    title: "React 18 Hooks",
    url: "https://pluralsight.pxf.io/g1K49X",
    image: "/courseimages/low/react-18-using-hooks.png",
    color: "green",
    short: "How to use React Hooks well, build your own, and combine them into fast, maintainable React apps.",
    long: "You’ll start by building your own useState Hook from scratch to see what a Hook really is. Then you’ll work through the built-in Hooks from the React team, and finally combine built-in, custom and third-party Hooks into real-world apps.",
  },
  {
    title: "React Server Component Fundamentals",
    url: "https://pluralsight.pxf.io/m5aYj1",
    image: "/courseimages/low/react-18-server-component-fundamentals.png",
    color: "amber",
    short: "How React Server Components improve the quality of your React apps and their architecture.",
    long: "You’ll dive into the technology behind Server Components so using them makes sense, build Server Components that work with async data sources, and incorporate them into a real-world app alongside Client Components.",
  },
  {
    title: "Working with Data in React",
    url: "https://pluralsight.pxf.io/QyrWB6",
    image: "/courseimages/low/react-working-data.png",
    color: "blue",
    short: "Build React apps that manage remote data well, including Suspense and React’s concurrent rendering features.",
    long: "You’ll establish data connections with Server Components and Server Actions, learn the practices that keep apps easy to build and maintain, and deliver performant experiences to the people using your browser applications.",
  },
];

export interface Service {
  icon: "teach" | "review" | "arch";
  color: BrandColor;
  title: string;
  text: string;
}

export const SERVICES: Service[] = [
  { icon: "teach", color: "blue", title: "Targeted teaching sessions", text: "Customized learning sessions on JavaScript and React, built around the problems your team is actually facing." },
  { icon: "review", color: "red", title: "Personalized code reviews", text: "Feedback that makes your code more efficient, readable and maintainable, with the reasoning behind each change." },
  { icon: "arch", color: "amber", title: "Architectural guidance", text: "A second opinion on the complex decisions in JavaScript and React projects before they become expensive." },
];

export interface Credential {
  badge: string;
  color: BrandColor;
  title: string;
  /** HTML; links only. */
  html: string;
}

export const CREDENTIALS: Credential[] = [
  { badge: "19×", color: "red", title: "Pluralsight author", html: `Authored <a href="${PLURALSIGHT_PROFILE}">19 courses</a> on React, JavaScript and modern web development.` },
  { badge: "MS", color: "blue", title: "Microsoft documentation author", html: "Wrote hundreds of pages of official documentation for ASP.NET Core and Chromium-based extensions." },
  { badge: "MVP", color: "green", title: "Microsoft MVP, 2007–2018", html: 'Recognized by the <a href="https://mvp.microsoft.com/">Microsoft MVP program</a> for twelve years of sharing technical knowledge.' },
  { badge: "2006", color: "amber", title: "Conference founder", html: 'Founded <a href="https://siliconvalley-codecamp.com/">Silicon Valley Code Camp</a>, drawing thousands of developers each year with sponsors like Google, Microsoft, IBM and PayPal.' },
  { badge: "1985", color: "blue", title: "Software company founder", html: "Founded 73rd Street Associates: clinic scheduling, insurance management and medical claims software for 500+ customers. Sold in 2000." },
  { badge: "BS·MS", color: "red", title: "Cornell University", html: "Bachelors and Masters in Mechanical and Aerospace Engineering, Ithaca, New York." },
];

export interface Milestone {
  when: string;
  color: BrandColor;
  title: string;
  text: string;
}

/** Newest first. */
export const TIMELINE: Milestone[] = [
  { when: "Now", color: "amber", title: "Author, teacher, consultant", text: "Nineteen Pluralsight courses, official Microsoft documentation for ASP.NET Core, and independent consulting on full-stack JavaScript and React." },
  { when: "2007", color: "red", title: "First of twelve Microsoft MVP awards", text: "Recognized every year through 2018 for sharing technical knowledge with the community." },
  { when: "2006", color: "blue", title: "Started Silicon Valley Code Camp", text: "A weekend of free sessions for developers. It grew to thousands of attendees, most recently hosted at PayPal HQ in 2019." },
  { when: "2000", color: "green", title: "Sold 73rd Street Associates", text: "A large insurance company purchased the company’s assets." },
  { when: "1985", color: "amber", title: "Founded 73rd Street Associates", text: "Founder, president, CTO and developer. Clinic scheduling, insurance company management and a turnkey physician office system for 500+ customers nationwide." },
  { when: "Cornell", color: "red", title: "Mechanical & Aerospace Engineering", text: "Bachelors and Masters degrees from Cornell University in Ithaca, New York." },
];

export interface Social {
  name: string;
  href: string;
  /** CSS color for the hover fill. */
  color: string;
  /** SVG inner markup, 24x24 stroke icons. */
  icon: string;
}

export const SOCIALS: Social[] = [
  { name: "GitHub", href: "https://github.com/pkellner", color: "#10131c", icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.7 6.4 7a3.4 3.4 0 0 0-.9 2.6V22"/>' },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/peterkellner99/", color: "var(--blue)", icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
  { name: "X", href: "https://x.com/pkellner", color: "#10131c", icon: '<path d="M4 4l11.7 16H20L8.3 4z"/><path d="M4 20l6.8-6.8m2.4-2.4L20 4"/>' },
  { name: "Mastodon", href: "https://techhub.social/@pkellner", color: "#6364ff", icon: '<path d="M21 8.5C21 4.2 18 3 18 3c-1.6-.7-4-1-6-1s-4.4.3-6 1c0 0-3 1.2-3 5.5 0 5.2-.3 11.5 5 12.8 2.5.6 4.6.7 6.4.6 2.2-.1 3.6-.8 3.6-.8l-.1-1.9s-1.6.5-3.4.4c-1.8 0-3.6-.2-3.9-2.4a4 4 0 0 1 0-.6s1.7.4 3.9.5c1.4.1 2.6-.1 3.9-.2 2.5-.3 4.6-1.8 4.9-3.2.4-2.2.5-5.4.5-5.4z"/><path d="M8 13V9a2 2 0 0 1 4 0v3m0 0V9a2 2 0 0 1 4 0v4"/>' },
  { name: "YouTube", href: "https://www.youtube.com/@SiliconValleyCodeCampVideos", color: "var(--red)", icon: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>' },
];

/** Topics for the scrolling ribbon on the home page. */
export const RIBBON_TOPICS = ["react", "nextjs", "claude", "mcp", "ASP.NET 2.0", "Sencha", "LINQ", "docker", "Entity Framework", "Silverlight", "Azure", "C#", "mysql", "ExtJS", "JavaScript", "typescript"];
